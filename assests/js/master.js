let list = document.getElementsByClassName('list')[0]
let scrolll = document.getElementById('scrolll')
let tname = document.getElementById('tname')
let sname = document.getElementById('sname')
let viewimg = document.getElementById('img')
let repeat = document.getElementById('repeat')
let shuffle = document.getElementById('shuffle')
let long = document.getElementsByClassName('long')[0]
let play = document.getElementById('play')
let puase = document.getElementById('pause')
let audio = document.getElementById('check')
let previous = document.getElementById('previous')
let next = document.getElementById('next')
let start = document.getElementById('start')
let end = document.getElementById('end')
let timeline = document.getElementById('timeline')
let coverr = document.getElementById('coverr')
let flag = 1
let i = 0
r = 1
sh = 1
const db = []
const du = []
const dtn = []
const dsn = []
const dsimg = []
let test


function myClick(i) {

    audio.setAttribute('src', du[i - 1])
    tname.innerHTML = `${dtn[i - 1]}`
    sname.innerHTML = `${dsn[i - 1]}`
    viewimg.setAttribute('src', dsimg[i - 1])
    audio.play()
    play.innerText = 'pause_circle'

}

fetch('https://mocki.io/v1/cb095437-951f-42a2-b644-5e096796106a')
    .then(res => res.json())
    .then(myVal => {
        myVal.map((val) => {
            let _div = document.createElement('div')
            _div.classList.add("coverRow")
            _div.innerHTML = `
                    <div class = "row">
                        <figure class="singerimg">
                                <img src="${val.songimage}">
                        </figure>
                        <div class="info">
                                <span class="track">${val.trackname}</span>
                                <span class="singer">${val.singername}</span>
                     </div>
        
        `


            _div.setAttribute('onclick', "myClick(" + val.id + ")")
            _div.setAttribute('data-id', val.id)
            _div.setAttribute('id', 'd')
            long.append(_div)
            long.style.height = (245 * (val.id + 1)) + 'px'


            db.push(val.id)
            du.push(val.url)
            dtn.push(val.trackname)
            dsn.push(val.singername)
            dsimg.push(val.songimage)

            list.addEventListener('scroll', (e) => {

                let st = e.target.scrollTop
                scrolll.style.top = (st + (st / (db.length / 2))) + 'px'

            })


        })




        // console.log(myVal[i]);
        update()
        function update() {


            setInterval(() => {
                let ct = audio.currentTime
                let minute = Math.floor((ct) / 60)
                let second = Math.floor((ct) % 60)
                // console.log(minute);
                // console.log(second-1);
                if (second < 10) {
                    end.innerHTML = minute + ':' + '0' + second
                } else {
                    end.innerHTML = minute + ':' + second
                }

            }, 1000);


            test = Math.floor(Math.random() * ((db.length) - 1))
            // console.log(test);
            if (audio.getAttribute('data-shuffle') == 'off') {
                tname.innerHTML = `${myVal[i].trackname}`
                sname.innerHTML = `${myVal[i].singername}`
                viewimg.setAttribute('src', myVal[i].songimage)
            } else {
                tname.innerHTML = `${myVal[test].trackname}`
                sname.innerHTML = `${myVal[test].singername}`
                viewimg.setAttribute('src', myVal[test].songimage)


            }

        }




        let coverrWidth = coverr.offsetWidth - timeline.offsetWidth;



        // timeupdate event listener
        audio.addEventListener("timeupdate", timeUpdate, false);

        // makes coverr clickable
        coverr.addEventListener("click", function (event) {
            movetimeline(event);
            audio.currentTime = duration * clickPercent(event);
        }, false);

        // returns click as decimal (.77) of the total coverrWidth
        function clickPercent(event) {
            return (event.clientX - getPosition(coverr)) / coverrWidth;

        }

        // makes timeline draggable
        timeline.addEventListener('mousedown', mouseDown, false);
        window.addEventListener('mouseup', mouseUp, false);

        // Boolean value so that audio position is updated only when the timeline is released
        var ontimeline = false;

        // mouseDown EventListener
        function mouseDown() {
            ontimeline = true;
            window.addEventListener('mousemove', movetimeline, true);
            audio.removeEventListener('timeupdate', timeUpdate, false);
        }

        // mouseUp EventListener
        // getting input from all mouse clicks
        function mouseUp(event) {
            if (ontimeline == true) {
                movetimeline(event);
                window.removeEventListener('mousemove', movetimeline, true);
                // change current time
                audio.currentTime = duration * clickPercent(event);
                audio.addEventListener('timeupdate', timeUpdate, false);
            }
            ontimeline = false;
        }
        // mousemove EventListener
        // Moves timeline as user drags
        function movetimeline(event) {
            var newMargLeft = event.clientX - getPosition(coverr);

            if (newMargLeft >= 0 && newMargLeft <= coverrWidth) {
                timeline.style.marginLeft = newMargLeft + "px";
            }
            if (newMargLeft < 0) {
                timeline.style.marginLeft = "0px";
            }
            if (newMargLeft > coverrWidth) {
                timeline.style.marginLeft = coverrWidth + "px";
            }
        }

        // timeUpdate
        // Synchronizes timeline position with current point in audio
        function timeUpdate() {
            var playPercent = coverrWidth * (audio.currentTime / duration);
            timeline.style.marginLeft = playPercent + "px";
            if (audio.currentTime == duration) {
                pButton.className = "";
                pButton.className = "play";
            }
        }



        // Gets audio file duration
        audio.addEventListener("canplaythrough", function () {
            duration = audio.duration;
        }, false);

        // getPosition
        // Returns elements left position relative to top-left of viewport
        function getPosition(el) {
            return el.getBoundingClientRect().left;
        }






        play.addEventListener('click', () => {
            if (flag % 2) {
                audio.setAttribute('src', myVal[i].url)
                audio.play()
                play.innerText = 'pause_circle'

                // console.log('first' + flag);
            } else {
                audio.removeAttribute('src')
                // console.log('second' + flag);
                play.innerHTML = 'play_circle'
                audio.pause()
            }
            flag++

            // console.log('third' + flag);

        })
        previous.addEventListener('click', () => {

            if (audio.getAttribute('data-shuffle') == 'off') {

                if (i != 0) {
                    i--
                    audio.setAttribute('src', myVal[i].url)
                    audio.play()
                    update()
                    play.innerText = 'pause_circle'
                    flag = 2

                }
            } else {
                update()
                // console.log(test);
                audio.setAttribute('src', myVal[test].url)
                audio.play()
                play.innerText = 'pause_circle'
                flag = 2
            }
        })

        const nextt = () => {
            if (audio.getAttribute('data-shuffle') == 'off') {
                if (i != ((db.length) - 1)) {
                    i++
                    audio.setAttribute('src', myVal[i].url)
                    audio.play()
                    // console.log(flag);
                    flag = 2
                    update()
                    play.innerText = 'pause_circle'
                }

            } else {
                update()
                // console.log(test);
                audio.setAttribute('src', myVal[test].url)
                audio.play()
                play.innerText = 'pause_circle'
                flag = 2
            }
        }





        next.addEventListener('click', nextt)





        repeat.addEventListener('click', () => {

            if (r % 2) {
                audio.setAttribute('loop', 'on')
                repeat.innerText = 'repeat_one'
            } else {
                audio.removeAttribute('loop')
                repeat.innerText = 'repeat'
            }
            r++
        })

        shuffle.addEventListener('click', () => {
            if (sh % 2) {
                shuffle.innerText = 'shuffle_on'
                audio.setAttribute('data-shuffle', 'on')
            } else {
                shuffle.innerText = 'shuffle'
                audio.setAttribute('data-shuffle', 'off')
            }
            sh++
        })


    })