const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const AuthorSchema = new mongoose.Schema({
    first_name: { type: String, required: true, maxLength: 100 },
    family_name: { type: String, required: true, maxLength: 100 },
    date_of_birth: { type: Date },
    date_of_death: { type: Date },
});

AuthorSchema.virtual("name").get(function () {
    let fullname = '';
    if (this.family_name && this.first_name)
        fullname = `${this.family_name}, ${this.first_name}`;
    return fullname;
});

AuthorSchema.virtual("url").get(function () {
    return `/catalog/author/${this._id}`;
});

AuthorSchema.virtual("date_of_birth_formatted").get(function () {
    return this.date_of_birth && DateTime.fromJSDate(this.date_of_birth).toLocaleString();
});

AuthorSchema.virtual("date_of_death_formatted").get(function () {
    return this.date_of_death && DateTime.fromJSDate(this.date_of_death).toLocaleString();
});

AuthorSchema.virtual("date_of_birth_yyyy_mm_dd").get(function () {
    return DateTime.fromJSDate(this.date_of_birth).toISODate(); // format 'YYYY-MM-DD'
}); 

AuthorSchema.virtual("date_of_death_yyyy_mm_dd").get(function () {
    return DateTime.fromJSDate(this.date_of_death).toISODate(); // format 'YYYY-MM-DD'
}); 

AuthorSchema.virtual("lifespan").get(function () {
    return (this.date_of_birth_formatted ?? '') + ' - ' + (this.date_of_death_formatted ?? '');
});

 

module.exports = mongoose.model("Author", AuthorSchema);