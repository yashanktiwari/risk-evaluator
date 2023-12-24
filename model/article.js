import { Schema, model, models } from 'mongoose';

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});


const Article = models.Article || model("Article", ArticleSchema);

export default Article;