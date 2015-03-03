/*
 * Copyright 2015-2016 TakWolf
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function() {

    /* return a int random num */
    function getRandomNum(min, max) {
        var range = max - min;
        var rand = Math.random();
        return(min + Math.round(rand * range));
    }

    /* cat class */
    function Cat() {

        /* reset position xy and speed */
        this.reset = function() {
            this.img.width = getRandomNum(100, 200);
            this.x = -this.img.width;
            this.y = getRandomNum(0, window.innerHeight - 100);
            this.img.style.left = this.x + 'px';
            this.img.style.top = this.y + 'px';
            this.speed = getRandomNum(1, 5);
        }

        this.img = document.createElement('img');
        this.img.src = 'img/nyancat.gif';
        this.img.style.position = 'fixed';
        this.wait = true; /* ture is not display */
        document.body.appendChild(this.img);
        this.reset();

        /* this should call in loop update callback */
        this.update = function(dt) {
            if (this.wait) {
                if (getRandomNum(0, 180) === 0) { /* about 3 seconds */
                    this.wait = false;
                    this.reset();
                }
            } else {
                this.x += this.speed;
                this.img.style.left = this.x + 'px';
                if (this.x > window.innerWidth + this.img.width) {
                    this.wait = true;
                }
            }
        }

    }

    /* cat array used to manage */
    var catArray = [];

    /* load callback */
    function load() {
        /* init cats */
        for (var n = 0; n < 20; n++) {
            catArray[n] = new Cat();
        }
        /* play bgm */
        var bgm = document.createElement('audio');
        bgm.src = 'bgm/nyancat.mp3';
        bgm.autoplay = 'autoplay';
        bgm.loop = 'loop'; /* FIXME : this is not work , I don't know why */
        window.setInterval(function() {
            bgm.src = 'bgm/nyancat.mp3'; /* FIXME : only this way can work , I am crazy !!! */
        }, 27097.687);
    }

    /* update callback */
    function update(dt) {
        for (var n = 0; n < catArray.length; n++) {
            catArray[n].update(dt);
        }
    }

    /* in load callback to make sure body element is exist */
    window.addEventListener('load', function() {
        /* make a fps loop frame */
        var fps = 60;
        var lastTime = new Date().getTime();
        var loop = function() {
            var nowTime = new Date().getTime();
            var deltaTime = nowTime - lastTime;
            if(deltaTime - 1000/fps >= 0) {
                lastTime = nowTime;
                update(deltaTime/1000);
            }
        };
        /* load callback */
        load();
        /* start loop as soon as possible */
        window.setInterval(loop, 1);
    }, false);

})();