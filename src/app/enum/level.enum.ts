export enum Level{
    p1 ='1er année primaire',
    p2 ='2eme année primaire',
    p3 ='3eme année primaire',
    p4 ='4eme année primaire',
    p5 ='5eme année primaire',
    p6 ='6eme année primaire',
    c1 ='1er année college',
    c2 ='2eme année college',
    c3 ='3eme année college',
    l1 ='1er année lycée',
    l2 ='2eme année lycée',
    l3 ='3eme année lycée',
}
export enum Category {
    Primaire = 'Primaire',
    College = 'Collège',
    Lycee = 'Lycée',
  }
  
  function getCategory(level: Level): Category {
    switch (level) {
      case Level.p1:
      case Level.p2:
      case Level.p3:
      case Level.p4:
      case Level.p5:
      case Level.p6:
        return Category.Primaire;
  
      case Level.c1:
      case Level.c2:
      case Level.c3:
        return Category.College;
  
      case Level.l1:
      case Level.l2:
      case Level.l3:
        return Category.Lycee;
  
      default:
        throw new Error('Niveau non reconnu');
    }
  }