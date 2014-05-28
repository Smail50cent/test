/**
 * 
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
// START GLOBAL VARS
var isConnected = window.navigator.onLine; // Use that if your want say if the device are online or offline
var currentTicket; // List of quantityOfProduct
var first = false;
var globalProducts = new Array(); //List of products used for the menu choose process 
var inRecapitulatif = false; // Use that to say if the recapitulatif is open or closed
var productsInMenu; // all products in a menu
var nom = window.location.pathname;
var productsChoosecInMenu; // products are choosed in a menu not validate
// DATA already charged
// END GLOBAL VARS
var useMenus = true; // si on affiche la slide des menus ou pas.
var htmlTestConnexion = getTestConnexionIconImg();
$(document).ready(function() {// thread connexion
    thread();
    testConnexion();
    function testConnexion() {
        if (window.navigator.onLine) {
            if (isConnected == false) {
                if (isLocalBddSuppored()) {
                    sendPendingsDatas();
                }
            }
            isConnected = true;
            var html = htmlTestConnexion;
            html = paramValue(html, "class", "greenIcon");
            $("#header_right_isconnced_id").html(html);
        } else {
            isConnected = false;
            var html = htmlTestConnexion;
            html = paramValue(html, "class", "redIcon");
            $("#header_right_isconnced_id").html(html);
        }
    }
    function thread() {
        window.setTimeout(function() {
            testConnexion();
            thread();
        }, 100);
    }
});
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null) {
        return "";
    } else {
        return results[1];
    }
}
nom = nom.split("/");
nom = nom[nom.length - 1];
nom = nom.substr(0, nom.lastIndexOf("."));
nom = nom.replace(new RegExp("(%20|_|-)", "g"), "");
onTemplateLoadStart();
function controller(entreprise) {
    var method = null;
    switch (nom) {
        case "carte":
            method = function() {
                var nbpersonne = getLocalStorageValue("paramCommande.nbPersonne");
                if (nbpersonne != null) {
                    printProduits(0);
                    var connexion = getConnexion();
                    connexion.getCategoriesForContentCategorie(onCarteLoadFinish);
                } else {
                    showInfoMessage(strings.getString("info.interdiction.commande.where.paramcommande"));
                    window.setTimeout(function() {
                        if (verifyFinish() == false) {
                            document.location.href = "paramCommande.php";
                        }
                    }, 3000);
                }
            };
            break;
        case "paramCommande":
            method = function() {
                var useComptes = entreprise.getUseComptes();
                var tables;
                if (getParameterByName("table") == "") {
                    tables = null;
                } else {
                    tables = getParameterByName("table");
                }
                onLoadParamCommande(15, tables, entreprise.langue);
            };
            break;
        case "reglement":
            method = function() {
                var total = getLocalStorageValue("reste.a.regler");
                onReglementLoadStart(parseFloat(total));
            };
            hideLoading();
            break;
        case "choixPaimentPersonnes":
            method = function() {
                var ticket = getLocalStorageValue("ticket");
                var nbCouverts = parseInt(getLocalStorageValue("nbCouverts"));
                onChoixPaimentPersonnesStart(nbCouverts, ticket);
            };
            hideLoading();
            break;
        case "compte":
            method = function() {
                onLoadCompte();
            };
            hideLoading();
            break;
        case "choixEnvoieCuisine":
            method = function() {
                onChoixEnvoieCuisineLoaded(0);
                hideLoading();
            };
            break;
        case "":
            hideLoading();
            break;
        case "index":
            hideLoading();
            break;
        default :
            hideLoading();
            break;
    }
    scripts.loadScripts(nom, method);
}
// TEST IF THE CACHE ARE UP TO DATE
if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
    window.location.reload();
} else {
// Manifest identique.
}
function onTemplateLoadStart() {
    var connexion = getConnexion();
    connexion.getEntreprise(onTemplateLoadFinish);
}
function onTemplateLoadFinish(entreprise) {
    useMenus = entreprise.menus;
    $("#title_app_id").text(entreprise.getNom()); //Name of companie in the title 
    $("#cssToApply").attr('href', './css/' + entreprise.getTheme()); //Show css are choosed 
    $("#header_right_logo_slogan").text(entreprise.getSlogan());
    $("#header_left_logo_message_id").text(entreprise.getMessage());
    controller(entreprise);
    choosePrintFooter();
}
/**
 * formatNumberToPrint ==> fntp
 * formater le nombre afin qu'il soit affichable
 * @param {integer} nombre description
 */
function fntp(nombre) {
    return nombre.toFixed(2) + " €";
}
function choosePrintFooter() {
    if (currentTicket == null) {
        hideFooter();
    } else {
        if (currentTicket.getQuantityOfProduct().length >= 1) {
            showFooter();
        } else {
            hideFooter();
        }
    }
}
function hideFooter() {
    $("#footer_id").hide();
    $("#btn_recapitulatif_commande_id").hide();
}

function showErrorMessage(message) {
    var element = $("#dialog_error_content_message_id");
    if (element.length) {
        $("#dialog_error_content_message_id").text(message);
    } else {
        var html = getDialogErrorMessage(message);
        html = paramValue(html, "message", message);
        $("body").append(html);
        $("#dialog_error_id").show();
    }
}
function closeErreurDialog(id) {
    $("#" + id).remove();
}
/**
 * Use this function to standarise the method to show an info
 * @param {String} message
 * 
 */
function showInfoMessage(message) {
    var element = $("#dialog_info_id");
    if (element.length) {
        $("#dialog_info_content_message_id").text(message);
    } else {
        var html = getDialogMessageInfo(message);
        html = paramValue(html, "message", message);
        $("body").append(html);
        $("#dialog_info_id").show();
    }
}
function postRedirict(url, args) {
    var form = "<form method=\"POST\" action=" + url + ">";
    for (var i = 0; i < args.length; i++) {
        form += "<input type=\"hidden\" name=\"arg" + (i + 1) + "\" value=\"" + args[i] + "\"";
    }
    form += "</form>";
    $(form).submit();
}

function getRedirict(page, args) {
    var param = "?";
    if (args != null) {
        for (var i = 0; i < args.length; i++) {
            if (i >= 1) {
                param += "&";
            }
            param += "arg" + (i + 1);
            param += "=" + args[i];
        }
    }
    if (param == "?") {
        document.location.href = page;
    } else {
        document.location.href = page + param;
    }
}

function log(message) {
    var isDev = true;
    if (isDev) {
        console.log(message);
    }
}
String.prototype.hashCode = function() {
    var hash = 0;
    if (this.length == 0)
        return hash;
    for (i = 0; i < this.length; i++) {
        char = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
};
function sendPendingsDatas() {
    var connexionLoc = getImplOfConnexionLocal();
    connexionLoc.getAllPendingMethods(function(pendings) {
        var connexionSrv = getConnexionServeur();
        var produitPriorite = config.getConfig("tablePendingDataTypeProduitPriorite");
        var ticketTableDisc = config.getConfig("tablePendingDataTypeTicket");
        for (var i = 0; i < pendings.length; i++) {
            switch (pendings[i].type) {
                case ticketTableDisc:
                    var ticket = (pendings[i].value);
                    connexionSrv.sendTicketToServeur(null, ticket, null);
                    break;
                case produitPriorite:
                    var prodPrio = (pendings[i].value);
                    connexionSrv.sendPersonnePriority(null, prodPrio, null);
                    break;

            }
            connexionSrv.deletePendingDataById(null, pendings[i].id, null);
        }
    }, null);
}
