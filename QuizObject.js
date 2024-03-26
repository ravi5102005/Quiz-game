
let UserAnswer = [];
// this obj is maintain the highScore
let HighScore = {
  Geography:{
           High_score       : 6,
           Player_Name      :"Ram",
           check_high_score : function(score,name){
                                 if(this.High_score<=score){
                                  this.High_score=score;
                                  this.Player_Name=name;
                                 }
                                }

          },
  History:{
           High_score       : 5,
           Player_Name      :"Gokul",
           check_high_score : function(score,name){
                                 if(this.High_score<=score){
                                  this.High_score=score;
                                  this.Player_Name=name;
                                 }
                                }
          },
  Political:{
           High_score       : 5,
           Player_Name      :"Sam",
           check_high_score : function(score,name){
                                 if(this.High_score<=score){
                                  this.High_score=score;
                                  this.Player_Name=name;
                                 }
                                }
          },
  Maths:{
           High_score       : 8,
           Player_Name      :"Raj",
           check_high_score : function(score,name){
                                 if(this.High_score<=score){
                                  this.High_score=score;
                                  this.Player_Name=name;
                                 }
                                }
          }
}





function _(idName) {
    let id = document.getElementById(idName);
    return id;
  }

function C(className) {
    let UserClassName = document.getElementsByClassName(className);
    return UserClassName;
}



let current_game_details = {
  player_name : "player",
  Category    : "Geography",
  correct_ans_count : 0,
  wrong_ans_count   : 0,
  change_correct_ans_count : function(count){
                        this.correct_ans_count=count;
                        this.wrong_ans_count=10-this.correct_ans_count;
                      },
  change_player_name : function(name){
                          this.player_name=name;
                      },
  change_category    : function(Category){
                          this.Category=Category;
                      },
  winner_img  : "win.png",
  looser_img  : "lost.png"
}

function setDataInStorage(){
  let highScoreData =JSON.stringify(HighScore);
  localStorage.setItem("Quiz_score",highScoreData);
}

function getDataInStorage(){
  let storageDetails = JSON.parse(localStorage.getItem("Quiz_score"));
  HighScore.Geography.check_high_score(storageDetails.Geography.High_score,storageDetails.Geography.Player_Name);
  HighScore.History.check_high_score(storageDetails.History.High_score,storageDetails.History.Player_Name);
  HighScore.Political.check_high_score(storageDetails.Political.High_score,storageDetails.Political.Player_Name);
  HighScore.Maths.check_high_score(storageDetails.Maths.High_score,storageDetails.Maths.Player_Name)
}
getDataInStorage();

