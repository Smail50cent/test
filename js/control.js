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
//                var useComptes = entreprise.getUseComptes();
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
        case "gestionProduit":
            method = function() {
                onLoadGP();
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
        default :
            nom = "index";
            method = function() {
                onIndexLoaded();
            };
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
    connexion.getEtablissementById(onTemplateLoadFinish, parseInt(config.getConfig("client.application.etablissement.id")), null);
}
function onTemplateLoadFinish(etablissement) {
    getConnexion().getParametreApplicationByNom(function(paramapp, param) {
        if (paramapp.getValeur_parametre() == true) {
        } else {
        }
    }, "app.use.cache", null);
    getConnexion().getParametreApplicationByNom(function(paramapp, param) {
        useMenus = paramapp.getValeur_parametre;
    }, "gestionDesUtilisateurs", null);
    if (etablissement.nom != null) {
        $("#title_app_id").text(etablissement.nom);
    } else {
        $("#title_app_id").text(etablissement.groupe.nom);
    }
    if (etablissement.style != null) {
        $("#cssToApply").attr('href', './css/' + etablissement.style + ".css");
    } else {
        console.log("null");
        $("#cssToApply").attr('href', './css/' + etablissement.groupe.style + ".css");
    }
    if (etablissement.slogan != null) {
        $("#header_right_logo_slogan").text(etablissement.slogan);
    } else {
        console.log("null");
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
function calculPrixWithTVA(prixHT, tauxTVA) {
    var tauxTVA = parseFloat(tauxTVA);
    return ((tauxTVA / 100) * prixHT) + prixHT;
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
    return calculPrixWithTVA(parseFloat(prixHt), tauxTva);
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
    var serveur = JSON.parse(getLocalStorageValue("personnes.serveur"));
    var typeCommande = getLocalStorageValue("type.commande");
    if (serveur != null) {
        if (parseInt(serveur.role.level) == 2 && typeCommande == 5) {
            isConnected = true;
        }
    }
    return isConnected;
}
//myStorage.indexedDB.countProduits(null,null);
