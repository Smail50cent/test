/**
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */

function onLoadGestionTables() {
    updateActivedLi(6);
    var html = getGererTablesPageGererTables();
    html = paramValue(html,"title",strings.getString("title.div.all.zonestables"));
    html = paramValue(html,"labelButtonAdd",strings.getString("label.addzonetable.button"));
    $("#new_container").html(html);
}

