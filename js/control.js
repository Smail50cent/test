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
                var tables;
                if (getParameterByName("table") == "") {
                    tables = null;
                } else {
                    tables = getParameterByName("table");
                }
                getConnexion().getParametreApplicationByNom(function(paramApp, param) {
                    onLoadParamCommande(15, tables, paramApp.valeur_parametre);
                }, "ask.user.for.language.paramcommande", null);
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
        case "gestionProduit":
            method = function() {
                if (!testIfAdminConnected()) {
                    $("body").html("");
                    showErrorMessage(strings.getString("connexion.users.acces.interdit"));
                    connexionDunServeur();
                } else {
                    printProduits(0);
                    var connexion = getConnexion();
                    connexion.getCategoriesForContentCategorie(onCarteLoadFinish);
                }
            };
            break;
        case "choixEnvoieCuisine":
            method = function() {
                onChoixEnvoieCuisineLoaded(0);
                hideLoading();
            };
            break;
        case "pageConnexionServeur":
            method = function() {
                onLoadPageConnexionServeur();
                hideLoading();
            };
            break;
        case "interfaceVenteAcces":
            method = function() {
                onLoadInterfaceVenteAcces();
                hideLoading();
            };
            break;
        case "":
            nom = "index";
            method = function() {
                onIndexLoaded();
            };
            hideLoading();
            break;
        case "index":
            nom = "index";
            method = function() {
                onIndexLoaded();
            };
            hideLoading();
            break;
        case "choixDateHeure":
            method = function() {
                onChoixdateHeureLoaded();
                hideLoading();
            };
            break;
        case "choixPriseDeCommande":
            method = function() {
                onChoixPriseDeCommandeLoaded();
                hideLoading();
            };
            break;
        case "modeexpert":
            method = function() {
                hideLoading();
                gestionAdmininistrateurConnected(onModeExpertLoaded());
            };
            break;
        default :
            nom = "index";
            method = function() {
                onIndexLoaded();
            };
            hideLoading();
            break;
    }
    scripts.loadScripts(nom, method);
    if (getParameterByName("indexeddbsupport") != "") {
        if (isIndexedDBSupported()) {
            alert("La base indexedDB est supporté par se navigateur.");
        } else {
            alert("Pas de support de la base indexedDB par se navigateur.");
        }
    }
}
// TEST IF THE CACHE ARE UP TO DATE
if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
    window.location.reload();
} else {
// Manifest identique.
}
function onTemplateLoadStart() {
    scripts.loadScripts("alertFreeow", function() {
        var connexion = getConnexion();
        var id;
        if (getLocalStorageValue("client.application.etablissement.id") == null) {
            id = parseInt(config.getConfig("client.application.etablissement.id"));
            setLocalStorageValue("client.application.etablissement.id", id);
        } else {
            id = parseInt(getLocalStorageValue("client.application.etablissement.id"));
        }
        connexion.getEtablissementById(onTemplateLoadFinish, id, null);
    });
}
function onTemplateLoadFinish(etablissement) {
    getConnexion().getParametreApplicationByNom(function(paramapp, param) {
        if (paramapp != null) {
            if (paramapp.getValeur_parametre() == true) {
            } else {
            }
        }
    }, "app.use.cache", null);
    getConnexion().getParametreApplicationByNom(function(paramapp, param) {
//        if (paramapp != null) {
        useMenus = paramapp.getValeur_parametre;
//        }
    }, "gestionDesUtilisateurs", null);
    if (etablissement.nom != null) {
        $("#title_app_id").text(etablissement.nom);
    } else {
        $("#title_app_id").text(etablissement.groupe.nom);
    }
    if (etablissement.logo != null) {
        $("#logo_header_font").text(etablissement.logo);
    } else {
        $("#logo_header_font").text(etablissement.groupe.logo);
    }
    if (etablissement.style != null) {
        $("#cssToApply").attr('href', './css/' + etablissement.style + ".css");
    } else {
        $("#cssToApply").attr('href', './css/' + etablissement.groupe.style + ".css");
    }
    if (etablissement.slogan != null) {
        $("#header_right_logo_slogan").text(etablissement.slogan);
    } else {
        $("#header_right_logo_slogan").text(etablissement.groupe.slogan);
    }
    if (etablissement.message != null && etablissement.message != "") {
        $("#header_left_logo_message_id").text(etablissement.message);
    } else {
        $("#header_left_logo_message_id").text(etablissement.groupe.message);
    }
    controller(etablissement);
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
    if (nom != "modeexpert") {
        var element = $("#dialog_error_content_message_id");
        if (element.length) {
            $("#dialog_error_content_message_id").text(message);
        } else {
            var html = getDialogErrorMessage(message);
            html = paramValue(html, "message", message);
            $("body").append(html);
            $("#dialog_error_id").show();
        }
    } else {
        var html = getAlertDanger();
        html = paramValue(html, "strongText", "Attention !");
        html = paramValue(html, "littleText", message);
        $("#error_liste").append(html);
    }
}
function closeErreurDialog(id) {
    $("#" + id).remove();
}
var htmlInfoMessage = getDialogMessageInfo();
var htmlInfoBootsrapMessage = getAlertInfo();
/**
 * Use this function to standarise the method to show an info
 * @param {String} message
 * 
 */
function showInfoMessage(message) {
    if (nom != "modeexpert") {
        var element = $("#dialog_info_id");
        if (element.length) {
            $("#dialog_info_content_message_id").text(message);
        } else {
            var html = htmlInfoMessage;
            html = paramValue(html, "message", message);
            $("body").append(html);
            $("#dialog_info_id").show();
        }
    } else {
        var html = htmlInfoBootsrapMessage;
        html = paramValue(html, "strongText", "Attention !");
        html = paramValue(html, "littleText", message);
        $("#error_liste").append(html);
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
//        console.log(message);
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
function calculPrixWithTVA(prixHT, tauxTVA) {
    var prix = parseFloat(prixHT) / (1 - (parseFloat(tauxTVA) / 100));
    return prix;
}
function calculPrixWithoutTVA(prixHT, tauxTVA) {
    var prix = parseFloat(prixHT) - parseFloat(prixHT) * parseFloat(tauxTVA) / 100;
    return prix.toFixed(2);
}
function getPrixHtInAssociation(associationPrixProduit, tauxTva) {
    var prixHt = 0;
    if (associationPrixProduit.length != 0) {
        if (associationPrixProduit.length == 1) {
            prixHt = parseFloat(associationPrixProduit[0].prixHt.prix);
        } else {
            var table = JSON.parse(getLocalStorageValue("paramCommande.numTable"));
            var currentDate = new Date().getTime();
            var priorityPrix = new Array();
            for (var i = 0; i < associationPrixProduit.length; i++) {
                var startDate = new Date(associationPrixProduit[i].dateDebut).getTime();
                var endDate = new Date(associationPrixProduit[i].dateFin).getTime();
                if (nom == "gestionProduit") {
                    if (table == null) {
                        var table = {"zone": 0};
                    }
                    table.zone = 0;
                }
                if (startDate == 0 && endDate == 0 && (associationPrixProduit[i].zoneTable.id) == null) {
                    priorityPrix.push({"value": associationPrixProduit[i], "priority": 4});
                } else if (startDate == 0 && endDate == 0 && associationPrixProduit[i].zoneTable.id == table.zone) {
                    priorityPrix.push({"value": associationPrixProduit[i], "priority": 3});
                } else if (isInCurentDate(associationPrixProduit[i].dateDebut, associationPrixProduit[i].heureDebut, associationPrixProduit[i].minutesDebut, associationPrixProduit[i].dateFin, associationPrixProduit[i].heureFin, associationPrixProduit[i].minutesFin) && associationPrixProduit[i].zone_table_id != table.zone) {
                    priorityPrix.push({"value": associationPrixProduit[i], "priority": 2});
                } else if (isInCurentDate(associationPrixProduit[i].dateDebut, associationPrixProduit[i].heureDebut, associationPrixProduit[i].minutesDebut, associationPrixProduit[i].dateFin, associationPrixProduit[i].heureFin, associationPrixProduit[i].minutesFin) && associationPrixProduit[i].zone_table_id == table.zone) {
                    priorityPrix.push({"value": associationPrixProduit[i], "priority": 1});
                }
            }
            if (priorityPrix.length != 0) {
                function compare(a, b) {
                    if (a.priority < b.priority)
                        return -1;
                    if (a.priority > b.priority)
                        return 1;
                    return 0;
                }
                priorityPrix = priorityPrix.sort(compare);
                priorityPrix = priorityPrix[0].value;
            }
            prixHt = priorityPrix.prixHt.prix;
        }
    } else {
        prixHt = 0;
    }
    return calculPrixWithTVA(prixHt, tauxTva);
}
function isInCurentDate(dateDebut, heureDebut, minutesDebut, dateFin, heureFin, minutesFin) {
    var ret = false;
    var currentDate = new Date().getTime();
    var startDate = new Date(dateDebut).getTime();
    var endDate = new Date(dateFin).getTime();
    if (currentDate > startDate && currentDate < endDate) {
        var currentTime = new Date();
        if (currentTime.getHours() >= heureDebut) {
            var startOk = true;
            if (currentTime.getHours() > heureDebut) {
                startOk = true;
            } else {
                if (currentTime.getHours() == heureDebut && currentTime.getMinutes() >= minutesDebut) {
                    startOk = true;
                } else {
                    startOk = false;
                }
            }
            var endOk = true;
            if (startOk == true) {
                if (currentTime.getHours() <= heureFin) {
                    endOk = true;
                    if (currentTime.getHours() == heureFin) {
                        if (currentTime.getMinutes() <= minutesFin) {
                            endOk = true;
                        } else {
                            endOk = false;
                        }
                    }
                } else {
                    endOk = false;
                }
            }
            if (endOk) {
                ret = true;
            }
        }
    }
    return ret;
}
function testIfIsServeurConnected() {
    var isConnected = false;
    var serveur = JSON.parse(getSessionStorageValue("personnes.serveur"));
    var typeCommande = getLocalStorageValue("type.commande");
    if (serveur != null) {
        if (parseInt(serveur.role.level) == 2 && typeCommande == 5) {
            isConnected = true;
        }
    }
    return isConnected;
}
function testIfAdminConnected() {
    var ret = false;
    var personne = getSessionStorageValue("personnes.serveur");
    if (personne != null) {
        personne = JSON.parse(personne);
        var level = parseInt(personne.role.level);
        if (level == 1) {
            ret = true;
        }
    }
    return ret;
}
function gestionAdmininistrateurConnected(method) {
    if (!testIfAdminConnected()) {
        $("body").html("");
        showErrorMessage(strings.getString("connexion.users.acces.interdit"));
    } else {
        if (method != null) {
            method();
        }
    }
}
