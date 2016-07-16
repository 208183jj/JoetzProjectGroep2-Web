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
    debugger;
    var tempUser = Meteor.users.findOne
    ({_id:params._userId});
    var history;
    //crossreference this with camps db, to get full history
    _.each(tempUser.camps, function(x){
        history.push(camps.findOne({_id: x}));
    });
    res.end(JSON.stringify(history));
});
//kamp bekijken
GET.route(baseUrl + 'camp/:_id', function (params, req, res, next) {
    debugger;
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
    return request.method = "POST";
})
//inschrijven voor kamp
POST.route(baseUrl + 'camp/register', function(params, req, res, next) {
    //check if camp is full
    //if camp not full
    //register
    var camp = camps.findOne({
        _id: req.body.campId
    });
    if(!camp.attendees.accepted)
    camp.attendees.accepted = [];
    if(!camp.attendees.pending)
    camp.attendees.pending = [];
    if(camp.attendees.accepted.length+camp.attendees.pending.length >= camp.maxMembers)
    res.end("Camp-Full");
    //TODO check if account contains all necessary data
    if(req.body.campId, req.body.userId)
    {camps.update({
        _id : req.body.campId
    }, {
        $push: {
            'attendees.pending': {
                userId: req.body.userId,
                timestamp: new Date()
            }
        }
    });
res.end("success");
}
res.end("failure");

});
POST.route(baseUrl + 'camp/add', 
function(params, req, res, next){
    if(req.body.title && req.body.description && req.body.place && req.body.departureTime 
    && req.body.returnTime && req.body.price && req.body.minAge && req.body.maxAge 
    && req.body.maxMembers && req.body.transport && req.body.formule && req.body.discounts
    && req.body.additionalInfo && req.body.contactInfo && req.body.employees /*&& req.body.pictures */)
    {
        camps.insert({
            title: req.body.title,
            description : req.body.description,
            place : req.body.place,
            departureTime : req.body.departureTime,
            returnTime : req.body.returnTime,
            attendees : {},
            //pictures : req.body.pictures,
            price : req.body.price,
            minAge : req.body.minAge,
            maxAge : req.body.maxAge,
            maxMembers : req.body.maxMembers,
            transport : req.body.transport,
            formule : req.body.formule,
            discounts : req.body.discounts,
            additionalInfo : req.body.additionalInfo,
            contactInfo : req.body.contactInfo,
            employees : req.body.employees
        })
        res.end("success");
        }
        else
        res.end("failure")
})
//add new activity
POST.route(baseUrl + 'activity/add', function(params, req, res, next) {
    debugger;
    if(req.body.title && req.body.place && req.body.timestamp && req.body.description)
    {
        activities.insert({title: req.body.title, 
            place: req.body.place, timestamp: req.body.timestamp,
        description: req.body.description, attending: [], notSure: [], absent: []
        });
        res.end("success");
    }
    res.end("failure");
})
//change registrations
POST.route(baseUrl + 'camp/registrations', function(params, req, res, next){
    debugger;
    if(req.body.userId&& req.body.attendeeId&&req.body.campId)
    {
        if(req.body.attendance === "accepted")
        {
            camps.update({
    _id: req.body.campId
  }, {
    $addToSet: {
      "attendees.accepted": {
        "userId": req.body.attendeeId,
        "timestamp":new Date()
      }
    }
  });
  camps.update({
    _id: req.body.campId
  }, {
    $pull: {
      "attendees.pending": {
        "userId": req.body.attendeeId,
        "timestamp":new Date()
      }
    }
  });
  res.end("success");
        }
        else
        {
camps.update({
    _id: req.body.campId
  }, {
    $addToSet: {
      "attendees.denied": {
        "userId": req.body.attendeeId,
        "comment":req.body.comment,
        "timestamp":new Date()
      }
    }
  });
  camps.update({
    _id: req.body.campId
  }, {
    $pull: {
      "attendees.pending": {
        "userId": req.body.attendeeId,
        "timestamp":new Date()
      }
    }
  });
  res.end("success")
        }
    }
    res.end("failure");
})
//register attendance
POST.route(baseUrl + 'activity/attendance', function(params, req, res, next) {
    debugger;
    if(req.body.attendance&&req.body.campId&&req.body.userId)
    {switch(req.body.attendance)
    {
        case "yes" : activities.update({_id: req.body.campId},{
            $push: {
                attending : {
                    timestamp: new Date(), 
                    user: req.body.userId
                }
            }
        });
        break;
        case "no": activities.update({_id: req.body.campId},{
            $push: {
                absent : {
                    timestamp: new Date(), 
                    user: req.body.userId
                }
            }
        });
        break;
        case "maybe": {
            activities.update({_id: req.body.campId},{
            $push: {
                notSure : {
                    timestamp: new Date(), 
                    user: req.body.userId
                }
            }
        });
        break;
        }
    }  
    res.end("success");
} else
res.end("failure");
})
//Login
POST.route(baseUrl + 'user/login', function(params, req, res, next){
    var user = Accounts.findUserByEmail(req.body.email);
    if(!ApiPassword.validate({email: user.emails[0].address, password: req.body.password}))
    {
        res.end("Unknown combination");
    }
    if(user.profile.role === "admin" || user.profile.role ==="employee")
    res.end(JSON.stringify(employees.findOne({_id: req.body.userId})));
    else 
    res.end(JSON.stringify(participants.findOne({_id: req.body.userId})));
})
//Register
POST.route(baseUrl + 'user/register', function(params, req, res, next) {
    if(req.body.email  && req.body.role)
    {
        if(!req.body.role||req.body.role==="participant")
        {
            if(req.body.password &&req.body.member&&req.body.contact&&req.body.parent&&req.body.participant&&req.body.emergencyContact&&req.body.additionalInfo)
            {
            var id = Accounts.createUser({
            email: req.body.email,
            password: req.body.password,
            profile: {
                role: req.body.role
            }
        });
        Accounts.sendVerificationEmail(id);
            participants.insert({
                _id: id,
                member: req.body.member,
                contact: req.body.contact,
                parent: req.body.parent,
                participant: req.body.participant,
                emergencyContact: req.body.emergencyContact,
                additionalInfo: req.body.additionalInfo
            });
            res.end("success")
        }}
        else
        {
            if(req.body.role==="employee"||req.body.role==="admin")
            {
                if(req.body.firstName&&req.body.name&&req.body.tel&&req.body.email&&req.body.role)
                {
            var id = Accounts.createUser({
            email: req.body.email,
            profile: {
                role: req.body.role
            }
        });
        Accounts.sendEnrollmentEmail(id);
            employees.insert({
                _id: id,
                firstName: req.body.firstName,
                name: req.body.name,
                tel: req.body.tel,
                email: req.body.email,
                role: req.body.role
            });
            res.end("success")
            }}
        }
    }
    res.end("failure");
})
POST.route(baseUrl + 'user/reset', function(params, req, res, next) {
    //Todo: reset password in db
    Accounts.sendResetPasswordEmail(Accounts.findUserByEmail(req.body.email)._id);
    res.end("email-sent");
})
POST.route(baseUrl + 'user/modify', function(params, req, res, next){
    //Todo: allow changing user information
    var user = Meteor.users.findOne({_id: req.body.userId});
    if(user)
   { if(user.profile.role === "admin"|| user.profile.role==="employee")
        {
            if(req.body.tel)
            {
                employees.update({
                    _id: req.body.userId
                },{$set:{
                    tel : req.body.tel
                }
                });
                res.end("success")
            }
            res.end("Not-Enough-Data");
        }
        else
        {
            if(req.body.member&&req.body.contact&&req.body.parent&&req.body.participant
            &&req.body.emergencyContact&&req.body.additionalInformation)
            {
                participants.update({
                    _id: req.body.userId
                },{
                    member : req.body.member,
                    contact : req.body.contact,
                    parent : req.body.parent,
                    participant : req.body.participant,
                    emergencyContact : req.body.emergencyContact,
                    additionalInformation : req.body.additionalInformation
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