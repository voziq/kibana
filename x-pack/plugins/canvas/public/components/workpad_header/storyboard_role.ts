export var StoryboardRole;
(function (StoryboardRole) {
    StoryboardRole["ADD"] = ($("#roleNameAdd", parent.document.body).val() == 'true');
    StoryboardRole["EDIT"] = ($("#roleNameEdit", parent.document.body).val() == 'true');
    StoryboardRole["DELETE"] = ($("#roleNameDelete", parent.document.body).val() == 'true');
})(StoryboardRole || (StoryboardRole = {}));