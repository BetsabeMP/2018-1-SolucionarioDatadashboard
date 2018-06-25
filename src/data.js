window.computeUsersStats = (users, progress, courses) => {
  for (let i = 0; i < users.length; i++) {
    let userId = users[i].id;
    /*puedo acceder de esta forma al progreso del usuario
    gracias a que la llave de cada progreso es el id del usuario*/
    let userProgress = progress[userId];
    for (let j = 0; j < userProgress.length; j++) {
      if (JSON.stringify(userProgress[j]) === '{}') {
        user[i].stats = {
          percent: 0,
          exercises: { percent: 0, },
          reads: { percent: 0, },
          quizzes: {
            percent: 0,
            scoreAvg: 0,
          }
        };
      } else {
        //inicializa en cero para luego hacer un contador.
        //for in recorre las llaves y for of recorre el valor.
        let percentGral;
        let lectures = 0;
        let lecturesCompleted = 0;
        let lecturesPercent;
        let quizzes = 0;
        let quizzesCompleted = 0;
        let quizzesPercent;
        let exercises = 0;
        let excercisesCompleted = 0;
        let exercisesPercent;

        //eso irá recorriendo cada id de curso
        for (let i in userProgress) {
          let element = userProgress[i];
          for (let unit of Object.values(element.units)) {
            //el object.value depende del js, a veces no lo necesita
            //for of nunca va a fallar, no da error en el i del índice
            for (let part of Object.values(unit.parts)) {
              //acá verifica si tuvo lecturas
              if (part.type === 'read') {
                lectures++;
              }
              if (part.length === 0) {
                lectures = 0;
                percentGral = 0;
              }
              if (part.type === 'read' && part.completed === 1) {
                lecturesCompleted++;
              }
              //math.round para redondear resultado
              //sacar el % fuera del for para evitar que recalcule
              lecturesPercent = Math.round((lecturesCompleted*100)/lectures);

              if (part.type === 'quiz') {
                quizzes++;
              }
              if (part.type === 'quiz' && part.completed === 1) {
                quizzesCompleted++;
              }
              if (part.length === 0) {
                quizzes = 0;
                percentGral = 0;
                exercises= 0;
                lectures= 0;
              }
              if (part.type === 'practice') {
                exercises++;
              }
              if (part.type === 'practice' && part.completed === 1) {
                excercisesCompleted++;
              }
              exercisesPercent = Math.round ((excercisesCompleted*100)/exercises)
            }
          }
        }
      }
    }
  }
}