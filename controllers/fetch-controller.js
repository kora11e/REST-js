const model = require('../modele')

fetchDat = (callback)=>{
    const userData=model.find({});
    userData.exec(function(err, data){
        if(err) throw err;
        return callback(data);
    })
}

module.exports = {

    fetchData:(req,res) => {
        
        model.fetchData((data)=> {
            res.render('user-table', {userData:data})
        })
    }
}