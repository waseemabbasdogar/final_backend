import mongoose, {Schema} from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

const videoSchema = new Schema({
    videoFile : {
        type : String,   // from claudinary url
        required : true
    },
    thumbnail : {
        type : String,   
        required : true
    },
    title : {
        type : String,   
        required : true
    },
    description : {
        type : String,   
        required : true
    },
    duration : {
        type :Number,   // from claudinary url
        required : true
    },
    views : {
        type : Number,   
        required : true,
        default : 0
    },
    isPublished : {
        type : Boolean,
        default : true
    },
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User"
    }
}, {
    timestamps : true
});


videoSchema.plugin(mongooseAggregatePaginate);


export const Video = Schema.model("Video", videoSchema);