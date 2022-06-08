import { mongoose } from 'mongoose'

const ListSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    }
});

export const TodoList = mongoose.model("TodoList", ListSchema);

