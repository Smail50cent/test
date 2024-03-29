
function Langues(id, label, gmtLevel, isActif, navigatorVar, type) {
    this.id = id;
    this.label = label;
    this.gmt_level = gmtLevel;
    this.actif = isActif;
    this.type = type;
    this.navigatorVar = navigatorVar;
}
function Entreprise() {
    this.nom;
    this.adresse;
    this.logo;
    this.theme;
    this.telephone;
    this.slogan;
    this.message;
    this.langue;
    this.use_comptes;
    this.setNom = function(nom) {
        this.nom = nom;
    };
    this.setMessage = function(message) {
        this.message = message;
    };
    this.getMessage = function() {
        return this.message;
    };
    this.setAdresse = function(adresse) {
        this.adresse = adresse;
    };
    this.setLogo = function(logo) {
        this.logo = logo;
    };
    this.setTheme = function(theme) {
        this.theme = theme;
    };
    this.setSlogan = function(slogan) {
        this.slogan = slogan;
    };
    this.getSlogan = function() {
        return this.slogan;
    };
    this.getNom = function() {
        return this.nom;
    };
    this.getAdresse = function() {
        return this.adresse;
    };
    this.getLogo = function() {
        return this.logo;
    };
    this.getTheme = function() {
        return this.theme;
    };
    this.setTelephone = function(telephone) {
        this.telephone = telephone;
    };
    this.getTelephone = function() {
        return this.telephone;
    };
    this.setUseComptes = function(use_comptes) {
        this.use_comptes = use_comptes;
    };
    this.getUseComptes = function() {
        return this.use_comptes;
    };
}

function Categorie() {
    this.id;
    this.nom;
    this.priorite;
    this.souscategorie; //array id souscategorie
    this.etablissement;
    this.zone;

    this.setEtablissement = function(etablissement) {
        this.etablissement = etablissement;
    };
    this.setZone = function(zone) {
        this.zone = zone;
    };
    this.getEtablissement = function() {
        return this.etablissement;
    };
    this.getZone = function() {
        return this.zone;
    };
    this.setId = function(id) {
        this.id = id;
    };
    this.setNom = function(nom) {
        this.nom = nom;
    };
    this.getNom = function() {
        return this.nom;
    };
    this.getId = function() {
        return this.id;
    };
    this.setPriorite = function(priorite) {
        this.priorite = priorite;
    };
    this.getPriorite = function() {
        return this.priorite;
    };
    this.setSousCategorie = function(souscategorie) {
        this.souscategorie = souscategorie;
    };
    this.getSousCategorie = function() {
        return this.souscategorie;
    };
}
function SousCategorie() {
    this.id;
    this.categorie;
    this.nom;
    this.priorite;
    this.taux_tva;
    
    this.setId = function(id) {
        this.id = id;
    };
    this.setNom = function(nom) {
        this.nom = nom;
    };
    this.getNom = function() {
        return this.nom;
    };
    this.setCategorie = function(categorie) {
        this.categorie = categorie;
    };
    this.getCategorie = function() {
        return this.categorie;
    };
    this.getId = function() {
        return this.id;
    };
    this.setPriorite = function(priorite) {
        this.priorite = priorite;
    };
    this.getPriorite = function() {
        return this.priorite;
    };
    this.setTauxTva = function(taux_tva) {
        this.taux_tva = taux_tva;
    };
    this.getTauxTva = function() {
        return this.taux_tva;
    };
}
function Ingredient() {
    this.id;
    this.nom;
    this.setId = function(id) {
        this.id = id;
    };
    this.setNom = function(nom) {
        this.nom = nom;
    };
    this.getNom = function() {
        return this.nom;
    };
    this.getId = function() {
        return this.id;
    };
}
;
function Produit() {
    this.id;
    this.nom;
    this.id_categorie;
    this.id_sousCategorie;
    this.options;
    this.ids_ingredients; // ARRAY
    this.associationPrixProduit;
    this.tauxTva;
    this.level;
    this.etablissements;
    this.zones;
    this.prix;

    this.Produit = function(id, nom, categorie, ingredients) {
        this.setCategorie(categorie);
        this.setId(id);
        this.setNom(nom);
        this.setIdsIngredients(ingredients);
    };
    this.setEtablissements = function(etablissements) {
        this.etablissements = etablissements;
    };
    this.setZones = function(zones) {
        this.zones = zones;
    };
    this.setPrix = function(prix) {
        this.prix = prix;
    };
    this.setId = function(id) {
        this.id = id;
    };
    this.getId = function() {
        return this.id;
    };
    this.setNom = function(nom) {
        this.nom = nom;
    };
    this.getNom = function() {
        return this.nom;
    };
    this.getOptions = function() {
        return this.options;
    };
    this.setOptions = function(options) {
        this.options = options;
    };
    this.setIdsIngredients = function(idsIngredients) {
        this.ids_ingredients = idsIngredients;
    };
    this.getSousCategorie = function() {
        return this.id_sousCategorie;
    };
    this.setSousCategorie = function(id_sousCategorie) {
        this.id_sousCategorie = id_sousCategorie;
    };
    this.getIdsIngredients = function() {
        return this.ids_ingredients;
    };
    this.setCategorie = function(categorie) {
        this.id_categorie = categorie;
    };
    this.getCategorie = function() {
        return this.id_categorie;
    };
    this.setAssociationPrixProduit = function(associationPrixProduit) {
        this.associationPrixProduit = associationPrixProduit;
    };
    this.getAssociationPrixProduit = function() {
        return this.associationPrixProduit;
    };
    this.setTauxTva = function(tauxTva) {
        this.tauxTva = tauxTva;
    };
    this.getTauxTva = function() {
        return this.tauxTva;
    };
    this.setLevel = function(level) {
        this.level = level;
    };
    this.getLevel = function() {
        return this.level;
    };
    this.getEtablissements = function() {
        return this.etablissements;
    };
    this.getZones = function() {
        return this.zones;
    };
    this.getPrix = function() {
        return this.prix;
    };
}
;
function Menu(id, produits, prix, nom) {
    this.id = id;
    this.nom = nom;
    this.produits = produits; //ARRAY
    this.prix = prix;
    this.tauxDeTva;
    this.setId = function(id) {
        this.id = id;
    };
    this.getId = function(id) {
        return  this.id;
    };
    this.setTauxDeTva = function(tauxDeTva) {
        this.tauxDeTva = tauxDeTva;
    };
    this.getTauxDeTva = function() {
        return  this.tauxDeTva;
    };
    this.setNom = function(nom) {
        this.nom = nom;
    };
    this.getNom = function() {
        return  this.nom;
    };
    this.setProduits = function(produits) {
        this.produits = produits;
    };
    this.setPrix = function(prix) {
        this.prix = prix;
    };
    this.getPrix = function() {
        return this.prix;
    };
    this.getProduits = function() {
        return this.produits;
    };
}
;
function QuantityOfProduct(id, product, quantity) {
    this.id = id;
    this.product = product;
    this.quantity = quantity;
    this.personne;
    this.setId = function(id) {
        this.id = id;
    };
    this.getId = function() {
        return this.id;
    };
    this.setProduit = function(product) {
        this.product = product;
    };
    this.getProduit = function() {
        return this.product;
    };
    this.setQuantity = function(quantity) {
        this.quantity = quantity;
    };
    this.getQuantity = function() {
        return this.quantity;
    };
    this.setPersonne = function(personne) {
        this.personne = personne;
    };
    this.getPersonne = function() {
        return this.personne;
    };
}

function Ticket(id, quantityOfProducts) {
    this.id = id;
    this.quantityOfProducts = quantityOfProducts;
    this.total;
    this.table;
    this.type_commande;
    this.setId = function(id) {
        this.id = id;
    };
    this.setQuantityOfProduct = function(quantityOfProduct) {
        this.quantityOfProducts = quantityOfProduct;
    };
    this.setNewQuantityOfProduct = function(quantityOfProduct) {
        this.quantityOfProducts.push(quantityOfProduct);
    };
    this.getId = function() {
        return this.id;
    };
    this.getQuantityOfProduct = function() {
        return this.quantityOfProducts;
    };
    this.getIndexOfQuantityOfProductById = function(id) {
        for (var i = 0; i < this.quantityOfProducts.length; i++) {
            if (this.quantityOfProducts[i].getId() == id) {
                return i;
            }
        }
    };
    this.calculerTotal = function() {
        var qop = this.getQuantityOfProduct();
        this.total = 0;
        if (qop != null) {
            for (y = 0; y < qop.length; y++) {
                var quantity = qop[y].getQuantity();
                var totalTTC;
                if (qop[y].product instanceof Menu) {
                    totalTTC = getPrixHtInAssociation(qop[y].getProduit().getPrix(), qop[y].getProduit().tauxDeTva);
                } else {
                    totalTTC = getPrixHtInAssociation(qop[y].getProduit().associationPrixProduit, qop[y].getProduit().tauxTva);
                }
                this.total += totalTTC * quantity;
            }
        }
        return this.total;
    };
}
function ConseilDuChef() {
    this.id;
    this.produit;
    this.getId = function() {
        return this.id;
    };
    this.setId = function(id) {
        this.id = id;
    };
    this.getProduit = function() {
        return this.id;
    };
    this.setProduit = function(produit) {
        this.produit = produit;
    };
}
function AssociationProduitIngredients(produit, ingredient, inStart, surcout, supprimable) {
    this.produit = produit;
    this.ingredient = ingredient;
    this.inStart = inStart;
    this.surcout = surcout;
    this.supprimable = supprimable;
    this.isAdded = false;
}
function Table(id, numero, zone) {
    this.id = id;
    this.numero = numero;
    this.zone = zone;
}
function ModeDeReglements(id, nom, url, redirictUrl) {
    this.id = id;
    this.nom = nom;
    this.url = url;
    this.redirictUrl = redirictUrl;
    this.getId = function() {
        return this.id;
    };
    this.setId = function(id) {
        this.id = id;
    };
    this.getNom = function() {
        return this.nom;
    };
    this.setNom = function(nom) {
        this.nom = nom;
    };
    this.getUrl = function() {
        return this.url;
    };
    this.setUrl = function(url) {
        this.url = url;
    };
    this.getRedirictUrl = function() {
        return this.redirictUrl;
    };
    this.setRedirictUrl = function(redirictUrl) {
        this.redirictUrl = redirictUrl;
    };
}
function PrixParPersonne(personne, totalpersonne) {
    this.type = "PRIXPARPERSONNE";
    this.personne = personne;
    this.totalpersonne = totalpersonne;
}
function ProduitNonAttribue(produit, idqop) {
    this.type = "PRODUITNONATTRIBUE";
    this.produit = produit;
    this.idqop = idqop;
}
function Personne() {
    this.id;
    this.nom;
    this.prenom;
    this.email;
    this.urlProfileImg;
    this.gender;
    this.role;
    this.serveurProperty;
    this.setId = function(id) {
        this.id = id;
    };
    this.setNom = function(nom) {
        this.nom = nom;
    };
    this.setPrenom = function(prenom) {
        this.prenom = prenom;
    };
    this.setEmail = function(email) {
        this.email = email;
    };
    this.setUrlProfileImg = function(urlProfileImg) {
        this.urlProfileImg = urlProfileImg;
    };
    this.setGender = function(gender) {
        this.gender = gender;
    };
    this.getId = function() {
        return this.id;
    };
    this.getNom = function() {
        return this.nom;
    };
    this.getPrenom = function() {
        return this.prenom;
    };
    this.getEmail = function() {
        return this.email;
    };
    this.getUrlProfileImg = function() {
        return this.urlProfileImg;
    };
    this.getGender = function() {
        return this.gender;
    };
    this.setRole = function(role) {
        this.role = role;
    };
    this.getRole = function() {
        return this.role;
    };
}
function Compte() {
    this.id;
    this.password;
    this.role;
    this.setId = function(id) {
        this.id = id;
    };
    this.setPassword = function(password) {
        this.password = password;
    };
    this.getId = function() {
        return this.id;
    };
    this.getPassword = function() {
        return this.password;
    };
    this.setRole = function(role) {
        this.role = role;
    };
    this.getRole = function() {
        this.role;
    };
}

function ParamForm() {

    this.id_form;
    this.actif;
    this.discrim;
    this.label;
    this.id_label_html;
    this.type_html;
    this.class_html;
    this.style_html;
    this.ordre;
    this.id_html;
    this.file_template_html;
    this.getFile_template_html = function() {
        return this.file_template_html;
    };
    this.getId_form = function() {
        return this.id_form;
    };
    this.getActif = function() {
        return this.actif;
    };
    this.getDiscrim = function() {
        return this.discrim;
    };
    this.getLabel = function() {
        return this.label;
    };
    this.getId_label_html = function() {
        return this.id_label_html;
    };
    this.getType_html = function() {
        return this.type_html;
    };
    this.getClass_html = function() {
        return this.class_html;
    };
    this.getStyle_html = function() {
        return this.style_html;
    };
    this.getOrdre = function() {
        return this.ordre;
    };
    this.getId_html = function() {
        return this.id_html;
    };
    this.setId_form = function(id_form) {
        this.id_form = id_form;
    };
    this.setActif = function(actif) {
        this.actif = actif;
    };
    this.setDiscrim = function(discrim) {
        this.discrim = discrim;
    };
    this.setLabel = function(label) {
        this.label = label;
    };
    this.setId_label_html = function(id_label_html) {
        this.id_label_html = id_label_html;
    };
    this.setType_html = function(type_html) {
        this.type_html = type_html;
    };
    this.setClass_html = function(class_html) {
        this.class_html = class_html;
    };
    this.setStyle_html = function(style_html) {
        this.style_html = style_html;
    };
    this.setOrdre = function(ordre) {
        this.ordre = ordre;
    };
    this.setId_html = function(id_html) {
        this.id_html = id_html;
    };
    this.setFile_template_html = function(file_template_html) {
        this.file_template_html = file_template_html;
    };
}

function AttributCompte() {

    this.id;
    this.id_form;
    this.valeur_champ;
    this.id_compte;
    this.defaut;
    this.setId = function(id) {
        this.id = id;
    };
    this.setId_form = function(id_form) {
        this.id_form = id_form;
    };
    this.setValeur_champ = function(valeur_champ) {
        this.valeur_champ = valeur_champ;
    };
    this.setId_compte = function(id_compte) {
        this.id_compte = id_compte;
    };
    this.setDefaut = function(defaut) {
        this.defaut = defaut;
    };
    this.getId = function() {
        return this.id;
    };
    this.getId_form = function() {
        return this.id_form;
    };
    this.getValeur_champ = function() {
        return this.valeur_champ;
    };
    this.getId_compte = function() {
        return this.id_compte;
    };
    this.getDefaut = function() {
        return this.defaut;
    };
}

function ParamApp() {

    this.id;
    this.nom_parametre;
    this.valeur_parametre;
    this.etablissement;

    this.setId = function(id) {
        this.id = id;
    };
    this.setNom_parametre = function(nom_parametre) {
        this.nom_parametre = nom_parametre;
    };
    this.setValeur_parametre = function(valeur_parametre) {
        this.valeur_parametre = valeur_parametre;
    };
    this.getId = function() {
        return this.id;
    };
    this.getNom_parametre = function() {
        return this.nom_parametre;
    };
    this.getValeur_parametre = function() {
        return this.valeur_parametre;
    };
    this.getEtablissement = function() {
        return this.etablissement;
    };
    this.setEtablissement = function(etablissement) {
        this.etablissement = etablissement;
    };
}
function CompteProduitFavori() {

    this.id;
    this.personneId;
    this.produit;
    this.setId = function(id) {
        this.id = id;
    };
    this.getId = function() {
        return this.id;
    };
    this.setPersonneId = function(personneId) {
        this.personneId = personneId;
    };
    this.getPersonneId = function() {
        return this.valeur_parametre;
    };
    this.getProduit = function() {
        return this.produit;
    };
    this.setProduit = function(produit) {
        this.produit = produit;
    };
}
function ParametreApplication() {

    this.id;
    this.nom_parametre;
    this.valeur_parametre;
    this.etablissement;
    this.getEtablissement = function() {
        return this.etablissement;
    };
    this.setEtablissement = function(etablissement) {
        this.etablissement = etablissement;
    };
    this.getId = function() {
        return this.id;
    };

    this.getNomParametre = function() {
        return this.nom_parametre;
    };

    this.getValeur_parametre = function() {
        return this.valeur_parametre;
    };

    this.setId = function(id) {
        this.id = id;
    };

    this.setNomParametre = function(nom_parametre) {
        this.nom_parametre = nom_parametre;
    };

    this.setValeurParametre = function(valeur_parametre) {
        this.valeur_parametre = valeur_parametre;
    };

}
function ReservationDateDisponible(id, date, heureDebut, heureFin, indisponible) {
    this.id = id;
    this.date = date;
    this.heureDebut = heureDebut;
    this.heureFin = heureFin;
    this.indisponible = indisponible;
}
function MajTables() {

    this.nomTable;
    this.level;

    this.setNomTable = function(nomTable) {
        this.nomTable = nomTable;
    };
    this.getNomTable = function() {
        return this.nomTable;
    };
    this.setLevel = function(level) {
        this.level = level;
    };
    this.getLevel = function() {
        return this.level;
    };
}
function ZoneTable(id, nom, tables, etablissement_id) {
    this.id = id;
    this.nom = nom;
    this.tables = tables;
    this.etablissement_id = etablissement_id;

    this.setId = function(id) {
        this.id = id;
    };
    this.getId = function() {
        return this.id;
    };
    this.setNom = function(nom) {
        this.nom = nom;
    };
    this.getNom = function() {
        return this.nom;
    };
    this.setTables = function(tables) {
        this.tables = tables;
    };
    this.getTables = function() {
        return this.tables;
    };
    this.setEtablissement_id = function(etablissement_id) {
        this.etablissement_id = etablissement_id;
    };
    this.getEtablissement_id = function() {
        return this.etablissement_id;
    };

}
function TypeCommande(id, label, labelMenu, isActif, idInPageHtml) {
    this.id = id;
    this.label = label;
    this.isActif = isActif;
    this.labelMenu = labelMenu;
    this.idInPageHtml = idInPageHtml;
}
function Option() {

    this.id;
    this.nom;
    this.label;
    this.possibilites;

    this.setId = function(id) {
        this.id = id;
    };
    this.getId = function() {
        return this.id;
    };
    this.setNom = function(nom) {
        this.nom = nom;
    };
    this.getNom = function() {
        return this.nom;
    };
    this.setLabel = function(label) {
        this.label = label;
    };
    this.getLabel = function() {
        return this.label;
    };
    this.setPossibilites = function(possibilites) {
        this.possibilites = possibilites;
    };
    this.getPossibilites = function() {
        return this.possibilites;
    };
}
function Groupe(id, nom, style, adresseSiege, slogan, message, telephone, logo) {
    this.id = id;
    this.nom = nom;
    this.style = style;
    this.adresseSiege = adresseSiege;
    this.slogan = slogan;
    this.message = message;
    this.telephone = telephone;
    this.logo = logo;
}
function Etablissement(id, nom, logo, style, adresseEtab, telephone, message, slogan, groupe) {
    this.id = id;
    this.nom = nom;
    this.logo = logo;
    this.style = style;
    this.adresseEtab = adresseEtab;
    this.telephone = telephone;
    this.message = message;
    this.slogan = slogan;
    this.groupe = groupe;
    this.zones;

    this.setId = function(id) {
        this.id = id;
    };
    this.getId = function() {
        return this.id;
    };
    this.setNom = function(nom) {
        this.nom = nom;
    };
    this.getNom = function() {
        return this.nom;
    };
    this.setZones = function(zones) {
        this.zones = zones;
    };
    this.getZones = function() {
        return this.zones;
    };
}
function TauxTva(id, taux) {

    this.id = id;
    this.taux = taux;

    this.setId = function(id) {
        this.id = id;
    };
    this.getId = function() {
        return this.id;
    };
    this.setTaux = function(taux) {
        this.taux = taux;
    };
    this.getTaux = function() {
        return this.taux;
    };

}
function AssociationProduitPrix() {

    this.id;
    this.datedebut;
    this.datefin;
    this.prixHt;
    this.zonetable;
    this.heuredebut;
    this.heurefin;
    this.minutedebut;
    this.minutefin;

    this.setHeuredebut = function(heuredebut) {
        this.heuredebut = heuredebut;
    };
    this.getHeuredebut = function() {
        return this.heuredebut;
    };
    this.setHeurefin = function(heurefin) {
        this.heurefin = heurefin;
    };
    this.getHeurefin = function() {
        return this.heurefin;
    };
    this.setMinutedebut = function(minutedebut) {
        this.minutedebut = minutedebut;
    };
    this.getMinutedebut = function() {
        return this.minutedebut;
    };
    this.setMinutefin = function(minutefin) {
        this.minutefin = minutefin;
    };
    this.getMinutefin = function() {
        return this.minutefin;
    };
    this.setId = function(id) {
        this.id = id;
    };
    this.getId = function() {
        return this.id;
    };
    this.setDatedebut = function(datedebut) {
        this.datedebut = datedebut;
    };
    this.getDatedebut = function() {
        return this.datedebut;
    };
    this.setPrixHt = function(prixHt) {
        this.prixHt = prixHt;
    };
    this.getPrixHt = function() {
        return this.prixHt;
    };
    this.setDatefin = function(datefin) {
        this.datefin = datefin;
    };
    this.getDatefin = function() {
        return this.datefin;
    };
    this.setZonetable = function(zonetable) {
        this.zonetable = zonetable;
    };
    this.getZonetable = function() {
        return this.zonetable;
    };
}

function Styles(id, nom, url, actif) {
    this.id = id;
    this.nom = nom;
    this.url = url;
    this.actif = actif;
}