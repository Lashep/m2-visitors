var app = new Vue({
    el : '#app',
    data : {
        guest : 0,
        errorMsg : "",
        successMsg : "",
        showModal : false,
        departamentAddress : "თამარაშვილი",
        visitors : [],
        newVisitor: {name:"", number:"", carNumber:"", hostName:""},
        currentVisitor : {},
        inputRules : [
            
        ]
    },
    mounted: function(){
        this.getAllVisitors();
    },
    methods: {
        getAllVisitors(){
            axios.get("http://localhost/m2/process.php?action=read").then(function(response){
                if(response.data.error){
                    app.errorMsg = response.data.message;
                }
                else {
                    app.visitors = response.data.visitors;
                }
            });
        },
        addVisitor(){
            var formData = app.toFormData(app.newVisitor);
            axios.post("http://localhost/m2/process.php?action=create", formData).then(function(response){
                app.newVisitor = {name:"", number:"", carNumber:"", hostName:""};
                if(response.data.error){

                    app.errorMsg = response.data.message;
                    setTimeout(function () {
                        app.errorMsg = "";
                    }, 2500);
                    
                }
                else {
                    app.successMsg = response.data.message;
                    setTimeout(function () {
                        app.successMsg = "";
                    }, 2500);
                    app.getAllVisitors();
                }
            });
        },
        updateVisitor(){
            var formData = app.toFormData(app.updateVisitor);
            axios.post("http://localhost/m2/process.php?action=update", formData).then(function(response){
                app.currentVisitor = {};
                if(response.data.error){
                    app.errorMsg = response.data.message;
                    setTimeout(function () {
                        app.errorMsg = "";
                    }, 2500);
                }
                else {
                    app.successMsg = response.data.message;
                    setTimeout(function () {
                        app.successMsg = "";
                    }, 2500);
                    app.getAllVisitors();
                }
            });
        },
        toFormData(obj){
            var fd = new FormData();
            for(var i in obj){
                fd.append(i,obj[i]);
            }
            return fd;
        },
        submit() {
            alert("submitted");
        },

    },


});