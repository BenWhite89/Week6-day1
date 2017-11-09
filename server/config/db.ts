import * as mysql from 'mysql';

export let pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'ben',
    password: 'pippin',
    database: 'AngularBlog'
});

export function row(procedureName: string, args: any) {
    return modifyBlog(procedureName, args)
        .then(function(resultsets: any) {
            return resultsets[0][0];
        });
}

export function rows(procedureName: string, args: any) {
    return modifyBlog(procedureName, args)
        .then(function(resultsets: any) {
            return resultsets[0];
        });
}

export function empty(procedureName: string, args: any) {
    return modifyBlog(procedureName, args)
        .then(function() {
            return;
        })
}

function modifyBlog(procedureName: string, args: any) {
    return new Promise(function(fulfill, reject) {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject(err);
            } else {
                let placeholders = '';
                if (args && args.length > 0) {
                    for (let i = 0; i < args.length; i++) {
                        if (i === args.length -1) {
                            placeholders += '?';
                        } else {
                            placeholders += '?,';
                        }
                    }
                }
                let callString = `CALL ${procedureName} (${placeholders});`;
                connection.query(callString, args, function(err, resultsets) {
                    if (err) {
                        connection.release();
                        reject(err);
                    } else {
                        connection.release();
                        fulfill(resultsets);
                    }
                })
            }
        })
    })
}

