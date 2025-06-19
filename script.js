let r1 = document.getElementById("r1")
let r2 = document.getElementById("r2")
let r3 = document.getElementById("r3")
let button = document.getElementById("button")
let radio = document.getElementsByClassName("radio")
let title = document.getElementById("textbox")
let message = document.getElementById("message")
let box1 = document.getElementById("box1")
let container = document.getElementById("container")
let buttonis = false

//disable all
message.disabled = true;
title.disabled = true;
r1.disabled = true;
r2.disabled = true;
r3.disabled = true;

//enable
let img = document.getElementById("img1")
img.addEventListener("click", () => {
   message.disabled = false;
   title.disabled = false;
   r1.disabled = false;
   r2.disabled = false;
   r3.disabled = false;
   title.style.backgroundColor = "#fcdada"
   message.style.backgroundColor = "#fcdada"
})

//store mssg
let mssg_store = ""
let title_store = ""

button.addEventListener("click", () => {
   let anyradio = r1.checked || r2.checked || r3.checked;
   if (message.value !== "" && title.value !== "" && anyradio) {

      //div create
      let div = document.createElement('div')
      let id = Math.floor(Math.random() * 10) + 1
      div.id = "box" + id
      div.className = "box"
      div.style.height = "auto"
      div.style.wordWrap = "break-word";
      div.style.overflow = "auto"
      div.style.width = "30vh";
      div.style.border = "1.5vh white solid"
      div.style.borderRadius = "8vh"

      div.innerHTML =
         `<h2 style="font-size :3vh;font-weight:bold;margin:2vh;text-align:center;color:white ;text-shadow: 1px 1px 2px black">${title.value.toUpperCase()}</h2>
      <h3 style="font-size :2vh;margin:2vh;font-weight:italic">${message.value}</h3>
        <h6 style="text-align: end;font-size: 1.5vh;line-height: 0;margin-right:4vh;color:blue;"> ${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}</h6>
  <h6 style="text-align: end;font-size: 1.5vh ;margin-bottom:2vh;line-height: 0;margin-right:4vh;color:blue"> ${new Date().getHours()}-${new Date().getMinutes()}-${new Date().getSeconds()}</h6>`


      div.addEventListener("mouseup", (event) => {
         if (div.querySelector('.delete-section')) return;
         let delete1 = document.createElement('section')
         delete1.className = "delete-section"


         //img1
         let img1 = document.createElement('img')
         img1.src = "./x-circle-fill.svg"
         img1.id = "drop1"
         img1.style.cursor = "pointer"
         img1.className = "cancel"

         //img2
         let img2 = document.createElement('img')
         img2.src = "./trash.svg"
         img2.id = "drop2"
         img2.className = "drop"

         //img3 
         let img3 = document.createElement("img")
         img3.src = "./pencil.svg"
         img3.id = "drop3"
         img3.className = "edit"

         delete1.appendChild(img1)
         delete1.appendChild(img3)
         delete1.appendChild(img2)
         div.appendChild(delete1)

         //cancel button
         img1.addEventListener("click", (event1) => {
            event1.stopPropagation();
            delete1.remove()
            updatelocal()
         })

         //edit button
         img3.addEventListener("click", (event1) => {
            event1.stopPropagation();
            if (div.querySelector('.text_divclass')) return;
            delete1.remove()

            img3.style.display = "none"
            //input for title

            let input = document.createElement("input")

            let h3text = div.querySelector("h3").innerText;
            let h2text = div.querySelector("h2").innerText;
            let h3 = div.querySelector("h3")
            let h2 = div.querySelector("h2")
            let h6 = div.querySelectorAll("h6")

            for (const e of h6) {
               e.style.display = "none"
            }
            //textbox for title
            input.type = "text"
            input.id = "text-div"
            input.className = "text_divclass"
            input.value = h2text
            input.style.backgroundColor = "purple"
            input.style.border = "none"
            input.style.marginBottom = "5vh"


            //textarea for message
            let input1 = document.createElement("textarea")
            input1.type = "text"
            input1.id = "text1-div"
            input1.className = "text_divclass"
            input1.style.backgroundColor = "ghostwhite"
            input1.style.border = "none"
            input1.value = h3text
            input1.style.height = "10vh"
            input1.rows = 3;

            let img4 = document.createElement("img")
            img4.src = "./floppy2-fill.svg"
            img4.id = "drop4"
            img4.className = "save"
            div.appendChild(input)
            div.appendChild(input1)
            div.appendChild(img4)
            h2.style.display = "none"
            h3.style.display = "none"

            //auto
            let blurTimer;
            input.addEventListener("blur", () => {
               blurTimer = setTimeout(() => {
                  img4.click();
               }, 200);
            });

            input1.addEventListener("blur", () => {
               blurTimer = setTimeout(() => {
                  img4.click();
               }, 200);
            });

            // Agar user dubara kisi input pe aaya toh cancel auto-save
            input.addEventListener("focus", () => {
               clearTimeout(blurTimer);
            });
            input1.addEventListener("focus", () => {
               clearTimeout(blurTimer);
            });



            img4.addEventListener("click", () => {
               buttonis = true
               if (input1.value == "" || input.value == "") {
                  input.value = h2text
                  input1.value = h3text
                  input.remove();
                  input1.remove();
                  img4.remove();
                  h2.style.display = "block";
                  h3.style.display = "block";
                  updatelocal()
               } else {
                  h3.innerText = input1.value;
                  h2.innerText = input.value;
                  h2.style.display = "block";
                  h3.style.display = "block";
                  for (const e of h6) {
                     e.style.display = "block";
                  }
                  input.remove();
                  input1.remove();
                  img4.remove();



                  updatelocal();
               }
            });




            updatelocal()
         })


         //delete

         img2.addEventListener("click", (event1) => {
            event1.stopPropagation();
            div.remove()
            updatelocal()
         })


         updatelocal()
      })
      container.append(div)

      if (r1.checked) {
         div.style.backgroundColor = "green"
      }
      else if (r2.checked) {
         div.style.backgroundColor = "yellow"
      }
      else {
         div.style.backgroundColor = "red"
      }
      message.value = ""
      title.value = ""
      r1.checked = false;
      r2.checked = false;
      r3.checked = false;






      // saved local storage
      function updatelocal() {

         let store = document.getElementsByClassName('box')
         let boxesHTML = []
         for (let i = 0; i < store.length; i++) {
            boxesHTML.push(store[i].outerHTML);
         }
         localStorage.setItem("store", JSON.stringify(boxesHTML));
      }
   }

   else {
     alert("Please fill in the Title and Message fields, and select a color.");
   }
})

//help-section
let icon = document.querySelector('#symbol');
icon.addEventListener("click", () => {
   window.location.href = "./help.html"
})


// retrive local storage
window.addEventListener("load", () => {
   let saved = JSON.parse(localStorage.getItem("store"));
   if (saved) {
      for (let a of saved) {
         let temp = document.createElement("div");
         temp.innerHTML = a;
         let div = temp.firstElementChild;

         container.appendChild(div);
         let oldSection = div.querySelector(".delete-section");
         if (oldSection) oldSection.remove();

         // Bind mouseup for restored box
         div.addEventListener("mouseup", (event) => {
            if (div.querySelector(".delete-section")) return;

            let delete1 = document.createElement("section");
            delete1.className = "delete-section";

            let img1 = document.createElement("img");
            img1.src = "./x-circle-fill.svg";
            img1.className = "cancel";

            let img2 = document.createElement("img");
            img2.src = "./trash.svg";
            img2.className = "drop";

            let img3 = document.createElement("img")
            img3.src = "./pencil.svg"
            img3.className = "edit"

            delete1.appendChild(img1);
            delete1.appendChild(img3)
            delete1.appendChild(img2);
            div.appendChild(delete1);

            // Cancel
            img1.addEventListener("click", (event1) => {
               event1.stopPropagation();
               delete1.remove();
               updatelocal();
            });

            // Delete
            img2.addEventListener("click", (event1) => {
               event1.stopPropagation();
               div.remove();
               updatelocal();
            });

            //edit
            //edit button
            img3.addEventListener("click", (event1) => {
               event1.stopPropagation();
               if (div.querySelector('.text_divclass')) return;
               delete1.remove()

               img3.style.display = "none"
               //input for title


               let input = document.createElement("input")
               let h3text = div.querySelector("h3").innerText;
               let h2text = div.querySelector("h2").innerText;
               let h3 = div.querySelector("h3")
               let h2 = div.querySelector("h2")
               let h6 = div.querySelectorAll("h6")

               for (const e of h6) {
                  e.style.display = "none"
               }
               //textbox for title
               input.type = "text"
               input.id = "text-div"
               input.className = "text_divclass"
               input.value = h2text
               input.style.backgroundColor = "purple"
               input.style.border = "none"
               input.style.marginBottom = "5vh"




               //textarea for message
               let input1 = document.createElement("textarea")
               input1.type = "text"
               input1.id = "text1-div"
               input1.className = "text_divclass"
               input1.style.backgroundColor = "lightpink"
               input1.style.border = "none"
               input1.value = h3text
               input1.rows = 3;




               let img4 = document.createElement("img")
               img4.src = "./floppy2-fill.svg"
               img4.id = "drop4"
               img4.className = "save"

               

               div.appendChild(input)
               div.appendChild(input1)
               div.appendChild(img4)

               h2.style.display = "none"
               h3.style.display = "none"


                 let blurTimer;

            input.addEventListener("blur", () => {
               blurTimer = setTimeout(() => {
                  img4.click();
               }, 200);
            });

            input1.addEventListener("blur", () => {
               blurTimer = setTimeout(() => {
                  img4.click();
               }, 200);
            });

            // Agar user dubara kisi input pe aaya toh cancel auto-save
            input.addEventListener("focus", () => {
               clearTimeout(blurTimer);
            });
            input1.addEventListener("focus", () => {
               clearTimeout(blurTimer);
            });

               img4.addEventListener("click", () => {
                  if (input1.value == "" || input.value == "") {
                     input.value = h2text
                     input1.value = h3text
                     input.remove();
                     input1.remove();
                     img4.remove();
                     for (const e of h6) {
                        e.style.display = "block";
                     }
                     h2.style.display = "block";
                     h3.style.display = "block";
                     updatelocal()
                  } else {
                     h3.innerText = input1.value;
                     h2.innerText = input.value;
                     h2.style.display = "block";
                     h3.style.display = "block";
                     for (const e of h6) {
                        e.style.display = "block";
                     }
                     input.remove();
                     input1.remove();
                     img4.remove();

                     updatelocal();
                  }
               });


               updatelocal()
            })
         });
      }
   }
});
