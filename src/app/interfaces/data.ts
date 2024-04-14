export interface MembreDTO { 
    codeMembre:String;
    photourl:string | undefined;
    signatureurl:string |undefined;
    nom:String;
    prenom:String;
    dateNaissance:String;
    genreMembre:String;
    email:String;
    numeroTelephone:String;
    adressePhysique:String;
    codePostalMembre:String;
    villeMembre:String;
    paysMembre:String;
    compteFacebook:String;
    compteInstagram:String;
    compteGoogle:String;
    
    pieceIdentite:String;
    numPieceIdentite:String;
    dateDelivrePiece:String;
    dateExpirePiece:String;
    nomTitulaireCarteCredit:String;
    numeroCarteCredit:String;
    moisExpirationCarteCredit:String;
    anneeExpirationCarteCredit:String;
    codeSecuriteCarteCredit:String;  
    
    
    montantAdhesion:String;
    dateDebutAdhesion:String;
    dateFinAdhesion:String;
    typeAdhesion:String;
    statutAdhesion:String;

    accepterConfidentialite:string;
    
}

export interface PageResponse<T> {
    content: T[];
    totalElements: number;
    
  }

  
export enum TypeContrat {
    Vente = 'Contrat de vente',
    Distribution = 'Contrat de distribution',
    Service = 'Contrat de service',
    Publicite = 'Contrat de publicité',
  
}

export enum StatutAdhesion {
    En_attente = 'En attente',
    Actif = 'Actif',
    Inactif = 'Inactif',
    Suspendu = 'Suspendu',
    Terminé = 'Terminé'
  }
  
  
export enum TypeJustificatif {
    PermisConduire = 'P. Conduire',
    Passport = 'Passeport',
    CarteAssurance = "C. Assurance",
  }
  /*
  export enum TypeJustificatif {
    CarteIdentite = "Carte d'identité",
    PermisConduire = 'Permis de conduire',
    Passport = 'Passeport',
    CarteSejour = 'Carte de séjour',
    CarteAssurance = "Carte d'assurance",
  }*/
  
export enum GenreMembre{
  Masculin = "Masculin",
  Feminin = 'Feminin',
}

export enum Pays{
  Etats_Unis = "États-Unis",
  Royaume_Uni = "Royaume-Uni",
  Canada = "Canada",
  France = "France",
  Allemagne = "Allemagne",
  Australie = "Australie",
  Inde = "Inde",
  Bresil = "Brésil",
  Japon = "Japon"
}

export enum Provinces{
Québec='Québec',
Ontario='Ontario',
Alberta='Alberta',
Colombie_Britannique='Colombie-Britannique',
Île_du_Prince_Édouard='Île-du-Prince-Édouard',
Manitoba='Manitoba',
Nouveau_Brunswick='Nouveau-Brunswick',
Nouvelle_Écosse='Nouvelle-Écosse',

Saskatchewan='Saskatchewan',
Terre_Neuve_et_Labrador='Terre-Neuve-et-Labrador',
Territoires_du_Nord_Ouest='Territoires du Nord-Ouest',
Nunavut='Nunavut',
Yukon='Yukon'
}

export enum ChoixPlanAdhesion{
  choixPlanAdhesion1 ="FAMILY SAVE",
  choixPlanAdhesion2 ="BUSINESS",
  choixPlanAdhesion3 ="GOLD STRAR",
}

export enum MontantPlanAdhesion{
  montantPlanAdhesion1 ="125.99",
  montantPlanAdhesion2 ="145.99",
  montantPlanAdhesion3 ="165.99",
}

export enum AvantagesAdhesion{
    avantage1="Accès aux entrepôts Costco pour les achats en gros à des prix réduits.Accès aux offres promotionnelles et aux remises régulières sur une large gamme de produits.Services de base : Accès aux services de base de Costco, comme les pharmacies et les stations-service.",
    avantage2="Tous les avantages de l'adhésion Gold Star.    Achats professionnels : Possibilité d'acheter des produits pour un usage professionnel ou commercial. Cartes supplémentaires : Possibilité de demander jusqu'à six cartes supplémentaires pour les employés autorisés de l'entreprise.",
    avantage3="Tous les avantages des adhésions Gold Star et Business.Récompense annuelle de 2% : Obtenez un pourcentage de récompense de 2% sur les achats Costco annuels (jusqu'à un certain montant). Avantages supplémentaires : Accès à des offres et à des événements exclusifs réservés aux membres Executive.",
}