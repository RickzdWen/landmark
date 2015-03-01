/**
 * Created by Administrator on 2015/2/16.
 */

var FaqModel = require(ROOT_PATH + '/models/FaqModel');

module.exports = function(router) {
    router.get('/', function(req, res, next){
        try {
            FaqModel.getInstance().getAll('published=?', [1]).then(function(rows){
                rows = rows || [];
                var list = [];
                rows.forEach(function(row){
                    if (row['question_' + res.lang]) {
                        row['question'] = row['question_' + res.lang];
                        row['answer'] = row['answer_' + res.lang];
                        list.push(row);
                    }
                });
                res.render('faq/index', {
                    list : list
                });
            }, function(err){
                next(err);
            });
        } catch (err) {
            next(err);
        }
    });
};
