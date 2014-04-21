var rubik = {};

rubik.enumFromArray = function(array) {
  var obj = {};
  for (var i = 0; i < array.length; i++) {
    obj[array[i]] = array[i];
  }
  return obj;
}

rubik.EDGES = rubik.enumFromArray([
  'UF',
  'UL',
  'UB',
  'UR',
  'DF',
  'DL',
  'DB',
  'DR',
  'RF',
  'FL',
  'LB',
  'BR',
]);

rubik.CORNERS = rubik.enumFromArray([
  'URF',
  'UFL',
  'UBL',
  'UBR',
  'DFR',
  'DLF',
  'DBL',
  'DRB',
]);

rubik.FACES = rubik.enumFromArray([
  'R',
  'L',
  'U',
  'D',
  'F',
  'B',
]);

rubik.MOVES = rubik.enumFromArray([
  'R',
  'L',
  'U',
  'D',
  'F',
  'B',
  'Ri',
  'Li',
  'Ui',
  'Di',
  'Fi',
  'Bi',
  'R2',
  'L2',
  'U2',
  'D2',
  'F2',
  'B2',
]);
