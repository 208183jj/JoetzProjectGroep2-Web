var bodyParser = Meteor.npmRequire('body-parser');
var baseUrl = '/api/v1/'
Picker.middleware(bodyParser.json());
Picker.middleware(bodyParser.urlencoded({
  extended: false
}));
//used to filter all the GET-requests
var GET = Picker.filter(function (request, response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  return request.method == "GET";
});
//historiek bekijken
GET.route(baseUrl + 'users/:userId/history', function(params, req, res, next) {
    //check user-acc for history
    var tempUser = Meteor.users.findOne({_id:params._userId});
    var history;
    //crossreference this with camps db, to get full history
    _.each(tempUser.camps, function(x){
        history.push(camps.findOne({_id: x}));
    });
    res.end(JSON.stringify(history));
});
Meteor.setInterval(function() {
    debugger;
}, 1000*90);
//kamp bekijken
GET.route(baseUrl + 'camp/:_id', function (params, req, res, next) {
    res.end(JSON.stringify(camps.find({_id: params._id}).fetch()));
});
//Medewerkers bekijken
GET.route(baseUrl + 'employees', function(params, req, res, next) {
    res.end(JSON.stringify(employees.find({}).fetch()));
})
//Medewerker bekijken
GET.route(baseUrl + 'employees/:userId', function(params, req, res, next){
    res.end(JSON.stringify(employees.findOne({_id: params.userId})));
})
//Activiteiten bekijken
GET.route(baseUrl + 'activities', function(params, req, res, next) {
    //todo:  send first 20 or so
    res.end(JSON.stringify(activities.find({},{timestamp:-1}).fetch()));
})


var POST = Picker.filter(function(request, response){
    response.setHeader("Access-Control-Allow-Origin","*");
    debugger;
    return request.method = "POST";
})
//inschrijven voor kamp
POST.route(baseUrl + 'camp/register', function(params, req, res, next) {
    //check if camp is full
    //if camp not full
    //register
    var camp = camps.findOne({
        _id: req.body._id
    });
    if(camp.members.accepted.length+camp.members.pending.length >= camp.maxMembers)
    res.end("Camp-Full");
    if(!req.body.rijksregister)
    res.end("Enter a valid national-identification-number");
    //TODO check if account contains all necessary data
    camps.update({
        _id : req.body._id
    }, {
        $push: {
            'members.pending': {
                rijksregisternummer : req.body.rijksregister,
                timeStamp: new Date()
            }
        }
    })
});
POST.route(baseUrl + 'camp/add', function(params, req, res, next){
    //todo: add camp
    if(params.title && params.description && params.place && params.departureTime 
    && params.returnTime && params.price && params.minAge && params.maxAge 
    && params.maxMembers && params.transport && params.formule && params.discounts
    && params.additionalInfo && params.contactInfo && params.employees)
    {
        camps.insert({
            title: params.title,
            description : params.description,
            place : params.place,
            departureTime : params.departureTime,
            returnTime : params.returnTime,
            attendees : params.attendees,
            pictures : params.pictures,
            price : params.price,
            minAge : params.minAge,
            maxAge : params.maxAge,
            maxMembers : params.maxMembers,
            transport : params.transport,
            formule : params.formule,
            discounts : params.discounts,
            additionalInfo : params.additionalInfo,
            contactInfo : params.contactInfo,
            employees : params.employees
        })
        res.end("success");
        }
        else
        res.end("failure")
})
//add new activity
POST.route(baseUrl + 'activity/add', function(params, req, res, next) {
    if(params.place && params.timeStamp && params.description)
    {
        activities.insert({title: params.title, 
            place: params.place, timestamp: params.timestamp,
        description: params.description, attending: [], notSure: [], absent: []
        });
        res.end("success");
    }
    res.end("failure");
})
//change registrations
POST.route(baseUrl + 'camp/registrations', function(params, req, res, next){
    //todo: move pending to accepted/denied
})
//register attendance
POST.route(baseUrl + 'activity', function(params, req, res, next) {
    switch(params.attendance)
    {
        case "yes" : activities.update({_id: params._id},{
            $push: {
                attending : {
                    timestamp: new Date(), 
                    user: params.userId
                }
            }
        });
        break;
        case "no": activities.update({_id: params._id},{
            $push: {
                absent : {
                    timestamp: new Date(), 
                    user: params.userId
                }
            }
        });
        break;
        case "maybe": {
            activities.update({_id: params._id},{
            $push: {
                notSure : {
                    timestamp: new Date(), 
                    user: params.userId
                }
            }
        });
        break;
        }
    }  
})
//Login
POST.route(baseUrl + 'user/login', function(params, req, res, next){
    var user = Meteor.users.findOne({_id: params._id});
    if(params.password !== user.password)
    {
        res.end("Unknown combination");
    }
    if(user.profile.role === "admin" || user.profile.role ==="employee")
    res.end(JSON.stringify(employees.findOne({_id: params.userId})));
    else 
    res.end(JSON.stringify(participants.findOne({_id: params.userId})));
})
//Register
POST.route(baseUrl + 'user/register', function(params, req, res, next) {
    debugger;
    if(params.email && params.password && params.role)
    {
        Accounts.createUser({
            email: params.email,
            password: params.password,
            profile: {
                role: params.role
            }
        });
        res.end("success")
    }
    res.end("failure");
    
})
POST.route(baseUrl + 'user/reset', function(params, req, res, next) {
    //Todo: reset password in db
    Accounts.sendResetPasswordEmail(params.userId);
    res.end("email-sent");
})
POST.route(baseUrl + 'user/modify', function(params, req, res, next){
    //Todo: allow changing user information
    var user = Meteor.users.findOne({_id: params.userId});
    if(user)
   { if(user.profile.role === "admin"|| user.profile.role==="employee")
        {
            if(params.firstName&&params.name&&params.tel&&params.email&&params.role)
            {
                employees.update({
                    _id: params.userId
                },{
                    firstName : params.firstName,
                    name : params.name,
                    tel : params.tel,
                    email : params.email,
                    role : params.role
                });
                res.end("success")
            }
            res.end("Not-Enough-Data");
        }
        else
        {
            if(params.member&&params.contact&&params.parent&&params.participant&&params.emergencyContact&&params.additionalInformation)
            {
                participants.update({
                    _id: params.userId
                },{
                    member : params.member,
                    contact : params.contact,
                    parent : params.parent,
                    participant : params.participant,
                    emergencyContact : params.emergencyContact,
                    additionalInformation : params.additionalInformation
                })
                res.end("success");
            }
            res.end("Not-Enough-Data");
        } 
    }
    else {
        res.end("Unknown-ID");
    }
})