onTemplateLoadStart();

function onTemplateLoadStart() {
    getEntreprise(onTemplateLoadFinish);
}
function onTemplateLoadFinish(entreprise) {
    useMenus = entreprise.menus;
    $("#title_app_id").text(entreprise.nom); //Name of companie in the title 
    $("#cssToApply").attr('href', '../../../css/' + entreprise.theme); //Show css are choosed 
    $("#header_right_logo_slogan").text(entreprise.slogan);
    $("#header_left_logo_message_id").text(entreprise.message);
}

function getEntreprise(methodToExecuteAfter) {
    $.ajax({
        url: "../../facade/getEntepriseMaj.php",
        type: 'GET',
        dataType: 'json',
        async: true,
        success: function(data, textStatus, xhr) {
//                    console.log("data.level=" + data.level + " clientLevel=" + clientLevel);
            pullNewData(methodToExecuteAfter);

        },
        error: function(xhr, textStatus, errorThrown) {
            showErrorMessage(strings.getString("label.error.connexion.serveur"));
        }
    });

    function pullNewData(methodToExecuteAfter) {
        $.ajax({
            url: "../../facade/getEntreprise.php",
            type: 'GET',
            dataType: 'json',
            async: true,
            success: function(data, textStatus, xhr) {
                methodToExecuteAfter(data);
            },
            error: function(xhr, textStatus, errorThrown) {
                showErrorMessage(strings.getString("label.error.connexion.serveur"));
            }
        });
    }
}
;

function modProduit() {

    alert('Modify');
}

function delProduit() {
    alert('Delete');
}

function addProduit() {
    var html = $('#ligne_table_product_id_0').html();
    $("#ligne_table_product_id_0 > td[id^='column_table_product_id_']").each(function() {
        var tdval = $(this).html();
        html = paramValue(html, tdval, "<input type=text >");
    });
    $('#body_table_product_id').prepend(html);



}

function paramValue(string, paramName, value) {
    var ret = true;
    while (ret) {
        if (string.indexOf(paramName) != -1) {
            string = string.replace(paramName, value);
        } else {
            ret = false;
        }
    }
    return string;
}
