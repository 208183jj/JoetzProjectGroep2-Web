camps = new Mongo.Collection('Camps');
/*
 _id
 title
 description
 place
 departureTime
 returnTime
 attendees = [
     accepted = [{userId, timestamp}]
     pending = [{userId, timestamp}]
     denied = [{userId, comment, timestamp}]
 ]
 pictures
 price
 ages
 maxMembers
 transport
 formule
 discounts
 additionalInfo
 contactInfo
 employees = [{userId}]
 */

activities = new Mongo.Collection('Activities');
/*
 _id
  timestamp
  title
  place
  description
  attending
  notSure
  absent
 */
//users is generated automatically by accounts-password and accounts-facebook
participants = new Mongo.Collection('Participants');
/*
  _id  --> gekoppeld aan users-tabel
  member: {aansluitingsnummer1 (optioneel)
        aansluitingsnummer2 (optioneel)
        code
        }
  contact: {
      nationalIdentificationNumber
      voornaam
      naam
      straat
      huisnummer en bus
      gemeente
      postcode
      email
      telefoon
  }
  parent: {
      nationalIdentificationNumber
      voornaam
      naam
      straat
      huisnummer en bus
      gemeente
      postcode
      email
      telefoon
  }
  participant: {
      nationalIdentificationNumber
      voornaam
      naam
      geboortedatum
      straat
      huisnummer bus
      gemeente
      postcode
  }
  EmergencyContact: {
      voornaam
      naam
      telefoon
  }
  AdditionalInformation:
 */
employees = new Mongo.Collection('Employees');
/*
  _id --> gekoppeld aan users tabel
  firstName
  name
  tel
  email
  role -->medewerker/monitor/beheerder/...
 */
