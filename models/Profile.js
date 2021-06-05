const { Schema, model, Types } = require('mongoose')

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
     teamName: {
        type: String,
        required: true,
        unique: true,
    },
    eventId: {
        type: Number,
    },

    team: [
    {
    participantName: {
        type: String,
        required: true,
    },
    participantGender: {
        type: String,
        required: true,
    },
     participantCellPhone: {
        type: Number,
        required: true,
    },
    participantAddress: {
        type: String,
        required: true,
    },
    participantCity: {
        type: String,
        required: true,
    },
    participantState: {
        type: String,
        required: true,
    },
   
    participantZip: {
        type: Number,
        required: true,
    },
    participantEmail: {
        type: String,
        required: true,
    },
    
    participantDOB: {
        type: String,
        required: true,
    },

}
], 
reps: [
{
    benchPress: {
        type: Number,
        required: true,
    },
    deadlift: {
        type: Number,
        required: true
    },
    hasSubmitted: {
        type: Boolean,
        required: true,
        default: false
    }
}
],

    date: {
        type: Date,
        default: Date.now,
    },
    miles: {
        total:
        {
            type: Number,
        required: true
    },
    hasSubmitted: {
        type: Boolean,
        default: false
    }
    }
},
{
    toJSON: {
        virtuals: true
    }
})
ProfileSchema.virtual("phaseOne").get(function() {
    var total = 0
    this.reps.map((rep, index) =>{
       
        if(index === 0 || index === 4){
return total += rep.benchPress + rep.deadlift
        } 
    })
    return total
})
ProfileSchema.virtual("phaseTwo").get(function(){
    var total = 0;
    this.reps.map((rep, index) =>{

        if(index === 1 || index === 5){
          return  total += rep.benchPress + rep.deadlift
        }
    })
    return total
})
ProfileSchema.virtual("phaseThree").get(function(){
    var total = 0;
    this.reps.map((rep, index) =>{
        if(index === 2 || index === 6){
          return  total += rep.benchPress + rep.deadlift
        }
    })
    return total
})
ProfileSchema.virtual("phaseFour").get(function(){
    var total = 0;
    this.reps.map((rep, index) =>{
        if(index === 3 || index === 7){
          return  total += rep.benchPress + rep.deadlift
        }
    })
    return total
});
ProfileSchema.virtual("totalScore").get(function(){
    var total = 0;
    
  total = ((200*this.phaseOne) + (200*this.phaseTwo) + (200*this.phaseThree) + (200*this.phaseFour) + (200*this.phaseOne) + (200*this.phaseTwo) + (200*this.phaseThree) + (200*this.phaseFour) + (2000*this.miles.total))/100;
 
  return total
})



const Profile = model('Profile', ProfileSchema)
module.exports = Profile
