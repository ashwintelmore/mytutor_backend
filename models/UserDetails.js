
const mongoose = require('mongoose');
const { Schema } = mongoose;

const educationSchema = new Schema({

    collegeName: String,
    degree: String,
    location: String,
    description: String,
    percentage: Number,
    date: {
        from: Date,
        to: Date
    },
    media: {
        type: [String]
    }
}, { _id: false });

const workExperienceSchema = new Schema({
    title: String,
    companyName: String,
    location: String,
    description: String,
    date: {
        from: Date,
        to: Date
    },
    media: {
        type: [String]
    }
}, { _id: false });

const achievementSchema = new Schema({
    title: String,
    organisation: String,
    location: String,
    description: String,
    date: {
        from: Date,
        to: Date
    },
    media: {
        type: [String]
    }
}, { _id: false });

const slotSchema = new Schema({
    available: {
        type: String,
        enum: ['everyday', 'weekend', 'weekdays', 'not available']
    },
    customDate: {
        type: [Date]
    },
    timeRange: {
        type: [{
            from: String,
            to: String
        }]
    }
}, { _id: false });

const userDetailsSchema = new Schema({
    role: {
        type: String,
        enum: ['tutor', 'learner', 'admin', 'common'],
        default: 'learner'
    },
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        trim: true,
    },

    profilePhoto: {
        type: String,
        default: ""
    },
    analytics: {
        lectures: {
            type: Number,
            default: 0
        },
        hours: {
            type: Number,
            default: 0
        },
        learners: {
            type: Number,
            default: 0
        },
        favorite: {
            type: Number,
            default: 0
        },
    },
    bio: {
        type: String,
        trim: true,
        // required: true,
        default: ""
    },
    phoneNumber: {
        type: Number,
        default: ""
    },
    socialMedia: {
        type: [String]
    },
    skills: {
        type: [String]
    },
    education: {
        type: Array
    },
    workExperience: {
        type: Array
    },
    achievements: {
        type: Array
    },
    slots: {
        available: {
            type: String,
            trim: true,
            default: ""
        },
        customDates: {
            type: Array,
            default: []
        },//array of selected date
        isEveryTime: {
            type: Boolean,
            default: false
        },
        timeRange: {
            type: Array,
            default: []
        }
    }
}, {
    timestamps: true
});



module.exports = mongoose.model('UserDetails', userDetailsSchema);
// const userDetailsSchema = new Schema({
//     bio: {
//         type: String,
//         trim: true,
//     },
//     phoneNumber: {
//         type: Number,
//     },
//     socialMedia: [
//         {
//             socialType: {
//                 type: String,
//                 trim: true
//             },
//             link: {
//                 type: String,
//                 trim: true
//             },
//         }
//     ],
//     skils: [String],
//     education: [
//         {
//             coll_Scho_name: {
//                 type: String,
//                 trim: true
//             },
//             degree_course_name: {
//                 type: String,
//                 trim: true
//             },
//             location: {
//                 type: String,
//                 trim: true
//             },
//             date: {
//                 from: {
//                     type: Date,
//                 },
//                 to: {
//                     type: Date,
//                 },
//             },
//             descrp: {
//                 type: String,
//                 trim: true
//             },
//             grade: {
//                 type: Number,
//                 trim: true
//             },
//             media: [String]//links
//         }
//     ],
//     worlExperiences: [
//         {
//             title: {
//                 type: String,
//                 trim: true
//             },
//             company: {
//                 type: String,
//                 trim: true
//             },
//             location: {
//                 type: String,
//                 trim: true
//             },
//             date: {
//                 from: {
//                     type: Date,
//                 },
//                 to: {
//                     type: Date,
//                 },
//             },
//             descrp: {
//                 type: String,
//                 trim: true
//             },
//             media: [String]//links
//         }
//     ],
//     achievements: [
//         {
//             title: {
//                 type: String,
//                 trim: true
//             },
//             organization: {
//                 type: String,
//                 trim: true
//             },
//             location: {
//                 type: String,
//                 trim: true
//             },
//             date: {
//                 from: {
//                     type: Date,
//                 },
//                 to: {
//                     type: Date,
//                 },
//             },
//             descrp: {
//                 type: String,
//                 trim: true
//             },
//             media: [String]//links
//         }
//     ],

//     slotAvailble: {
//         type: String,
//         trim: true
//     },
//     slotDates: [Date],
//     slotTimeRage: {
//         from: {
//             type: String,
//         },
//         to: {
//             type: String,
//         },
//     },

//     // timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }

// });
/*
profilephoto


bio
phoneNUmber ->number
social media
skills-> array
edcuation -> array of objects
  college/schoole name,
  degree/coursename,
  location,
  description,
  percentage
  date -> from to
  media -> links/photo/certificate

Work Experience -> array of objects
  title,
  company name,
  location,
  description,
  date -> from to
  media -> links/photo/certificate

Acheivements -> array of objects
  title,
  Orgnisation,
  location,
  description,
  date -> from to
  media -> links/photo/certificate

slots
  available -> options
   everyday/weekend/weekdays/Not Available
   customeDate -> listOf date -> array
   time range -> from to -> array of objects


*/