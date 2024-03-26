
let currentQuizTime = 10;
let CurrentQuestion = 0;
let QuizStart = 1;
let questionMove=10;
_("Next_Qusestion_Button").addEventListener("click",()=>{
  ShowNestQuestion();
  // QuestionMove();
  questionMove=10;
  currentQuizTime=10;
  C("question_count_move")[0].style.width="0%";
  _("Current_Question_Number").textContent=CurrentQuestion;
})


// this function is used to count current  question
// display next question
function ShowNestQuestion(){
  if(_("Next_Qusestion_Button").value=="Submit"){
    checkUserAnswer(`${current_game_details["Category"]}`,UserAnswer);
    moveResultPage();
    writeScore();
    _("Next_Qusestion_Button").value="Next";
    QuizStart=0;
    CurrentQuestion=0;
  }


if(current_game_details["Category"]=="Geography"){
    _("Question").textContent=Georphy_Question_Ans[CurrentQuestion]["Question"];
    for(let i=0;i<4;i++){
        C("option")[i].textContent=Georphy_Question_Ans[CurrentQuestion]["Option"][i]
    }
    _("Question_img").style.backgroundImage=`url(${Georphy_Question_Ans[CurrentQuestion]["Related_img"]})`;
    }

else if(current_game_details["Category"]=="History"){
  _("Question").textContent=History_Question_Ans[CurrentQuestion]["Question"];
  for(let i=0;i<4;i++){
      C("option")[i].textContent=History_Question_Ans[CurrentQuestion]["Option"][i]
  }
  _("Question_img").style.backgroundImage=`url(${History_Question_Ans[CurrentQuestion]["Related_img"]})`;
}
else if(current_game_details["Category"]=="Political"){
  _("Question").textContent=Political_Question_Ans[CurrentQuestion]["Question"];
  for(let i=0;i<4;i++){
      C("option")[i].textContent=Political_Question_Ans[CurrentQuestion]["Option"][i]
  }
  _("Question_img").style.backgroundImage=`url(${Political_Question_Ans[CurrentQuestion]["Related_img"]})`;
}
else if(current_game_details["Category"]=="Maths"){
  _("Question").textContent=Maths_Question_Ans[CurrentQuestion]["Question"];
  for(let i=0;i<4;i++){
      C("option")[i].textContent=Maths_Question_Ans[CurrentQuestion]["Option"][i]
  }
  _("Question_img").style.backgroundImage=`url(${Maths_Question_Ans[CurrentQuestion]["Related_img"]})`;
}


  if(CurrentQuestion<10){
    ++CurrentQuestion;
    console.log(CurrentQuestion);
    changeOptionColor("none");
}

if(CurrentQuestion==10){
  _("Next_Qusestion_Button").value="Submit";
}
}

//this is used to move the result page
function moveResultPage(){
  QuizStart=0;
  _("result_page").style.height="100vh";
}


// this function is used to manage time in the quiz time

function QuizTime(){
  if( QuizStart==1){
    if(currentQuizTime>=0){
    currentQuizTime--;

    if(questionMove<=50){
    C("question_count_move")[0].style.width=`${questionMove}%`;
    C("question_count_move")[0].style.backgroundColor="green";
    }
    else if(questionMove<=80){
      C("question_count_move")[0].style.width=`${questionMove}%`;
      C("question_count_move")[0].style.backgroundColor="orange";
    }
    else{
      C("question_count_move")[0].style.width=`${questionMove}%`;
      C("question_count_move")[0].style.backgroundColor="red";
    }
    questionMove+=10;

    setTimeout(QuizTime,1000);
    }
    else{
      ShowNestQuestion();
      currentQuizTime=10;
      console.log(CurrentQuestion+"     current q................")
      _("Current_Question_Number").textContent=CurrentQuestion;////
      questionMove=0
      QuizTime();
    }
}
}


// this is used to change color to selected option
_("Question_page").addEventListener("click",(event)=>{
  console.log(CurrentQuestion-1+"     llllllllllllll")
     let targetId = event.target.id;
     if(event.target.className=="option"){
      changeOptionColor(targetId);
      UserAnswer[CurrentQuestion-1]=_(`${targetId}`).textContent;
     }
})

function changeOptionColor(option){
   for(let i=0;i<4;i++){
    C("option")[i].style.boxShadow="inset 0 0 10px 0.5px rgb(208, 192, 143), inset 0 2px 1px 1px rgba(255, 255, 255, 0.9), inset 0 -2px 1px rgba(255, 255, 255, 0.25)";
   }
   if(option!="none"){
   _(`${option}`).style.boxShadow= "inset 0 0 30px 5px rgb(255, 187, 0), inset 0 2px 1px 1px rgba(255, 255, 255, 0.9), inset 0 -2px 1px rgba(255, 255, 255, 0.25)";
   }
}


//this function is used to check the answer
function checkUserAnswer(Category,answer){
let worng_ans_numbers =[];
let Category_Questions=[];
let Category_Answers  =[]
let userScore=0;

switch(Category){
  case "Geography":
     for(let i=0;i<10;i++){
       if(Georphy_Question_Ans[i]["Answer"]==answer[i]){
        userScore++;
       }
       else{
        worng_ans_numbers.push(i)
       }
       Category_Questions.push(Georphy_Question_Ans[i]["Question"])
       Category_Answers.push(Georphy_Question_Ans[i]["Answer"]);
     }
     HighScore.Geography.check_high_score(userScore,`${current_game_details["player_name"]}`);
     setDataInStorage();
     wrightHighScore();
     ReviewAnswers(answer,worng_ans_numbers,Category_Questions,Category_Answers);
     break;
  case "History":
     for(let i=0;i<10;i++){
       if(History_Question_Ans[i]["Answer"]==answer[i]){
        userScore++;
       }
       else{
        worng_ans_numbers.push(i)
       }
       Category_Questions.push(History_Question_Ans[i]["Question"]);
       Category_Answers.push(History_Question_Ans[i]["Answer"]);
     }
     HighScore.History.check_high_score(userScore,current_game_details["player_name"]);
     setDataInStorage();
     wrightHighScore();
     ReviewAnswers(answer,worng_ans_numbers,Category_Questions,Category_Answers);
     break;
  case "Political":
     for(let i=0;i<10;i++){
       if(Political_Question_Ans[i]["Answer"]==answer[i]){
        userScore++;
       }
       else{
        worng_ans_numbers.push(i)
       }
       Category_Questions.push(Political_Question_Ans[i]["Question"]);
       Category_Answers.push(Political_Question_Ans[i]["Answer"]);
     }
     HighScore.Political.check_high_score(userScore,`${current_game_details["player_name"]}`);
     setDataInStorage();
     wrightHighScore();
     ReviewAnswers(answer,worng_ans_numbers,Category_Questions,Category_Answers);
     break;
  case "Maths":
     for(let i=0;i<10;i++){
       if(Maths_Question_Ans[i]["Answer"]==answer[i]){
        userScore++;
       }
       else{
        worng_ans_numbers.push(i)
       }
       Category_Questions.push(Maths_Question_Ans[i]["Question"]);
       Category_Answers.push(Maths_Question_Ans[i]["Answer"]);
     }
     HighScore.Maths.check_high_score(userScore,current_game_details["player_name"]);
     setDataInStorage();
     wrightHighScore();
     ReviewAnswers(answer,worng_ans_numbers,Category_Questions,Category_Answers);
}
current_game_details.change_correct_ans_count(`${userScore}`)
}

//this function is used to check the user name
function checkUserName(){
    if(_("user_name_input").value.trim("")!=""){
      current_game_details.change_player_name(_("user_name_input").value)
      return true;
    }
    return false;
  }
  
  
  // this is used to get get in side the quiz page
  _("enter_quiz_page").addEventListener("click",()=>{
    console.log("ininininininnnnnn")
    if(checkUserName()){
      _("category_page").style.height="100vh";
      _("player_name").textContent=_("user_name_input").value.slice(0,15);  /*change player name*/
    }
  })
  
  
  //this is user to find the category
  _("category_page").addEventListener("click",(event)=>{
      let current_user_category = event.target.parentNode.id.slice(9)
      if(event.target.parentNode.className=="category"){
      current_game_details.change_category(current_user_category)
      }
  })
  
  
  //this is used to start the quiz game
  _("start_quiz").addEventListener("click",()=>{
    QuizStart=1;
    _("Question_page").style.height="100vh";
    _("category_page").style.height="0";
    _("category_level").textContent=`${current_game_details["Category"]}`;
    C("question_count_move")[0].style.width="0%";
    questionMove=10;
    QuizTime();
     CurrentQuestion=0;
    ShowNestQuestion();
    UserAnswer=[];
  })
  
  
  //this is used to write score in result page
  function writeScore(){
     _("correct_ans").textContent=`${current_game_details["correct_ans_count"]}`;
     _("wrong_ans").textContent=`${current_game_details["wrong_ans_count"]}`
     if(current_game_details["correct_ans_count"]>=5){
     _("result_img").style.backgroundImage=`url(${current_game_details["winner_img"]})`;
     _("reuslt_stats").textContent="Victory !";
     }
     else{
      _("result_img").style.backgroundImage=`url(${current_game_details["looser_img"]})`;
      _("reuslt_stats").textContent="Defeat";
     }
  }
  
  
  // result page to category page
  _("back_result_page").addEventListener("click",()=>{
     _("result_page").style.height="0";
     _("category_page").style.height="100vh";
  })
  
  
  //play again
  _("play_again").addEventListener("click",()=>{
    _("result_page").style.height="0";
     _("category_page").style.height="0";
     _("Question_page").style.height="100vh";
     QuizStart=1;
     questionMove=0;
     C("question_count_move")[0].style.width="0%";
     QuizTime();
      CurrentQuestion=0;
     ShowNestQuestion();
     UserAnswer=[];
    
  })
  
  //quiz page to home page
  _("back_Quiz_page").addEventListener("click",()=>{
    currentQuizTime=10;
    QuizStart=0;
    CurrentQuestion=0;
    questionMove=0;
    C("question_count_move")[0].style.width="0%";
    _("result_page").style.height="0";
    _("category_page").style.height="100vh";
})


    //this is used to write the high score in high score page
    function wrightHighScore(){
      C("h_p_name")[0].textContent=HighScore["Geography"]["Player_Name"];
      _("Geography_high_score").textContent=HighScore["Geography"]["High_score"];
  
      C("h_p_name")[1].textContent=HighScore["History"]["Player_Name"];
      _("History_high_score").textContent=HighScore["History"]["High_score"];
  
      C("h_p_name")[2].textContent=HighScore["Political"]["Player_Name"];
      _("Political_high_score").textContent=HighScore["Political"]["High_score"];
  
      C("h_p_name")[3].textContent=HighScore["Maths"]["Player_Name"];
      _("Maths_high_score").textContent=HighScore["Maths"]["High_score"];
    }
  
  wrightHighScore();
  
  
  _("High_score_img").addEventListener("click",()=>{
    _("High_score_page").style.height="100vh";
  })
  
  _("back_stats_page").addEventListener("click",()=>{
    _("High_score_page").style.height="0";
  })




  // this is used to add user answer in result page
  function ReviewAnswers(answer,Wrongans_num,category_Q,Correct_answerws){

    console.log(answer);
    console.log(Wrongans_num);
    console.log(category_Q);
    console.log(Correct_answerws);
    document.getElementById("userAnswer").innerHTML="";
    let worng_ans_count=0;
    for(let num of Wrongans_num){
      document.getElementById("userAnswer").innerHTML+=`<p class="answer_review_Question">${num+1}) ${category_Q[num]}<p>`;
      if(`${answer[num]}`!="undefined"){
        document.getElementById("userAnswer").innerHTML+=`<p class="answer_review_page"> ${answer[num]}<p>`;
        document.getElementById("userAnswer").innerHTML+=`<p class="C_Answer_review_page"> ${Correct_answerws[num]}<p>`;
     }
     else{
       document.getElementById("userAnswer").innerHTML+=`<p class="answer_review_page">"😕 Skipped"<p>`;
       document.getElementById("userAnswer").innerHTML+=`<p class="C_Answer_review_page"> ${Correct_answerws[num]}<p>`;
     }
     worng_ans_count++;
    }

    changeWrongAnsColor(worng_ans_count);


}

// this is used to change the worng answer colour in review page
function changeWrongAnsColor(num){

  for(let i=0;i<num;i++){
  // if(worngans_num.includes(i)){
    C("answer_review_page")[i].style.color = "red";
    C("C_Answer_review_page")[i].style.color = "green";
  // }
 }
}

// this is used to show the review page
_("review_img").addEventListener("click",()=>{
  _("review_page").style.height="100%";
})

_("back_review_page").addEventListener("click",()=>{
  _("review_page").style.height="0";
})