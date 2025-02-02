/* eslint-disable */
// prettier-ignore

// import { asteroidsjs } from '@services/asteroids';
export function asteroidsjs(toastyEnabled = false) {
  function t() {
    function t(t, e) {
      'Object' == typeof t
        ? ((this.x = t.x), (this.y = t.y))
        : ((this.x = t), (this.y = e));
    }
    function e(t, e) {
      (this.p1 = t), (this.p2 = e);
    }
    window.ASTEROIDS ||
      (window.ASTEROIDS = {
        totalEnemies: 0,
        enemiesKilled: 0,
        startedPlaying: new Date().getTime(),
      }),
      (t.prototype = {
        cp: function () {
          return new t(this.x, this.y);
        },
        mul: function (t) {
          return (this.x *= t), (this.y *= t), this;
        },
        mulNew: function (e) {
          return new t(this.x * e, this.y * e);
        },
        add: function (t) {
          return (this.x += t.x), (this.y += t.y), this;
        },
        addNew: function (e) {
          return new t(this.x + e.x, this.y + e.y);
        },
        sub: function (t) {
          return (this.x -= t.x), (this.y -= t.y), this;
        },
        subNew: function (e) {
          return new t(this.x - e.x, this.y - e.y);
        },
        rotate: function (t) {
          const e = this.x,
            i = this.y;
          return (
            (this.x = e * Math.cos(t) - Math.sin(t) * i),
            (this.y = e * Math.sin(t) + Math.cos(t) * i),
            this
          );
        },
        rotateNew: function (t) {
          return this.cp().rotate(t);
        },
        setAngle: function (t) {
          const e = this.len();
          return (this.x = Math.cos(t) * e), (this.y = Math.sin(t) * e), this;
        },
        setAngleNew: function (t) {
          return this.cp().setAngle(t);
        },
        setLength: function (t) {
          const e = this.len();
          return e ? this.mul(t / e) : (this.x = this.y = t), this;
        },
        setLengthNew: function (t) {
          return this.cp().setLength(t);
        },
        normalize: function () {
          const t = this.len();
          return (this.x /= t), (this.y /= t), this;
        },
        normalizeNew: function () {
          return this.cp().normalize();
        },
        angle: function () {
          return Math.atan2(this.y, this.x);
        },
        collidesWith: function (t) {
          return (
            this.x > t.x &&
            this.y > t.y &&
            this.x < t.x + t.width &&
            this.y < t.y + t.height
          );
        },
        len: function () {
          const t = Math.sqrt(this.x * this.x + this.y * this.y);
          return t < 0.005 && t > -0.005 ? 0 : t;
        },
        is: function (t) {
          return 'object' == typeof t && this.x == t.x && this.y == t.y;
        },
        toString: function () {
          return (
            '[Vector(' +
            this.x +
            ', ' +
            this.y +
            ') angle: ' +
            this.angle() +
            ', length: ' +
            this.len() +
            ']'
          );
        },
      }),
      (e.prototype = {
        shift: function (t) {
          this.p1.add(t), this.p2.add(t);
        },
        intersectsWithRect: function (i) {
          const s = new t(i.x, i.y + i.height),
            n = new t(i.x, i.y),
            o = new t(i.x + i.width, i.y + i.height),
            a = new t(i.x + i.width, i.y);
          return (
            (this.p1.x > s.x &&
              this.p1.x < a.x &&
              this.p1.y < s.y &&
              this.p1.y > a.y &&
              this.p2.x > s.x &&
              this.p2.x < a.x &&
              this.p2.y < s.y &&
              this.p2.y > a.y) ||
            !!this.intersectsLine(new e(n, s)) ||
            !!this.intersectsLine(new e(s, o)) ||
            !!this.intersectsLine(new e(n, a)) ||
            !!this.intersectsLine(new e(a, o))
          );
        },
        intersectsLine: function (t) {
          const e = this.p1,
            i = this.p2,
            s = t.p1,
            n = t.p2,
            o = (n.y - s.y) * (i.x - e.x) - (n.x - s.x) * (i.y - e.y),
            a = (n.x - s.x) * (e.y - s.y) - (n.y - s.y) * (e.x - s.x),
            h = (i.x - e.x) * (e.y - s.y) - (i.y - e.y) * (e.x - s.x);
          if (0 == o) return !1;
          const l = a / o,
            c = h / o;
          return l >= 0 && l <= 1 && c >= 0 && c <= 1;
        },
      });
    let i = this,
      s = !!window.ActiveXObject,
      n = s && 'BackCompat' == document.compatMode,
      o = document.documentElement.clientWidth,
      a = document.documentElement.clientHeight;
    n && ((o = document.body.clientWidth), (a = document.body.clientHeight));
    let didKill = false;
    let h = [
        [-15, -10],
        [-15, 10],
        [15, 0],
      ],
      l = ['HTML', 'HEAD', 'BODY', 'SCRIPT', 'TITLE', 'META', 'STYLE', 'LINK'];
    window.ActiveXObject &&
      (l = [
        'HTML',
        'HEAD',
        'BODY',
        'SCRIPT',
        'TITLE',
        'META',
        'STYLE',
        'LINK',
        'SHAPE',
        'LINE',
        'GROUP',
        'IMAGE',
        'STROKE',
        'FILL',
        'SKEW',
        'PATH',
        'TEXTPATH',
        'INS',
      ]);
    let c,
      r,
      d = ['BR', 'HR'],
      u = s ? 20 : 40,
      p = s ? 10 : 20;
    function y() {
      for (var t, e = 0; (t = i.enemies[e]); e++) k(t, 'ASTEROIDSYEAHENEMY');
      const s = document.body.getElementsByTagName('*');
      let n;
      for (i.enemies = [], e = 0; (n = s[e]); e++) {
        -1 == P(l, n.tagName.toUpperCase()) &&
          'g_vml_' != n.prefix &&
          b(n) &&
          'ASTEROIDSYEAH' != n.className &&
          n.offsetHeight > 0 &&
          ((n.aSize = v(n)),
          i.enemies.push(n),
          I(n, 'ASTEROIDSYEAHENEMY'),
          n.aAdded || ((n.aAdded = !0), i.totalEnemies++));
          window.ASTEROIDS.totalEnemies = i.totalEnemies;
      }
    }
    function m(t) {
      return 0.0174532925 * t;
    }
    function f(t, e) {
      return Math.floor(Math.random() * (e + 1) + t);
    }
    function g(t) {
      const e = { up: 38, down: 40, left: 37, right: 39, esc: 27 };
      return e[t] ? e[t] : t.charCodeAt(0);
    }
    function v(t) {
      let e = t,
        i = 0,
        s = 0;
      do {
        (i += e.offsetLeft || 0), (s += e.offsetTop || 0), (e = e.offsetParent);
      } while (e);
      return {
        x: i,
        y: s,
        width: t.offsetWidth || 10,
        height: t.offsetHeight || 10,
      };
    }
    function x(t, e, i) {
      t.addEventListener
        ? t.addEventListener(e, i, !1)
        : t.attachEvent &&
          ((t['e' + e + i] = i),
          (t[e + i] = function () {
            t['e' + e + i](window.event);
          }),
          t.attachEvent('on' + e, t[e + i]));
    }
    function E(t, e, i) {
      t.removeEventListener
        ? t.removeEventListener(e, i, !1)
        : t.detachEvent &&
          (t.detachEvent('on' + e, t[e + i]),
          (t[e + i] = null),
          (t['e' + e + i] = null));
    }
    function w(t) {
      for (var e, i = 0; (e = window.ASTEROIDSPLAYERS[i]); i++)
        e.gameContainer.style.visibility = t;
    }
    function S(t, e) {
      w('hidden');
      let i = document.elementFromPoint(t, e);
      return i
        ? (3 == i.nodeType && (i = i.parentNode), w('visible'), i)
        : (w('visible'), !1);
    }
    function A(e) {
      for (let s = new Date().getTime(), n = u, o = 0; o < n; o++)
        i.particles.push({
          dir: new t(
            20 * Math.random() - 10,
            20 * Math.random() - 10,
          ).normalize(),
          pos: e.cp(),
          cameAlive: s,
        });
    }
    function T() {
      i.points.innerHTML = 10 * window.ASTEROIDS.enemiesKilled;
    }
    function b(t) {
      if (t.offsetLeft < -100 && t.offsetWidth > 0 && t.offsetHeight > 0)
        return !1;
      if (-1 != P(d, t.tagName)) return !0;
      if (0 == t.offsetWidth && 0 == t.offsetHeight) return !1;
      for (let e = 0; e < t.childNodes.length; e++)
        if (
          -1 == P(d, t.childNodes[e].tagName) &&
          0 != t.childNodes[e].childNodes.length
        )
          return !1;
      return !0;
    }
    function P(t, e, i) {
      if (t.indexOf) return t.indexOf(e, i);
      for (
        let s = t.length, n = i < 0 ? Math.max(0, s + i) : i || 0;
        n < s;
        n++
      )
        if (t[n] === e) return n;
      return -1;
    }
    function I(t, e) {
      -1 == t.className.indexOf(e) &&
        (t.className = (t.className + ' ' + e)
          .replace(/\s+/g, ' ')
          .replace(/^\s+|\s+$/g, ''));
    }
    function k(t, e) {
      t.className = t.className.replace(
        new RegExp('(^|\\s)' + e + '(?:\\s|$)'),
        '$1',
      );
    }
    (this.flame = { r: [], y: [] }),
      (this.toggleBlinkStyle = function () {
        this.updated.blink.isActive
          ? k(document.body, 'ASTEROIDSBLINK')
          : I(document.body, 'ASTEROIDSBLINK'),
          (this.updated.blink.isActive = !this.updated.blink.isActive);
      }),
      (function (t, e) {
        const i = document.createElement('style');
        (i.type = 'text/css'),
          (i.rel = 'stylesheet'),
          (i.id = 'ASTEROIDSYEAHSTYLES');
        try {
          i.innerHTML = t + '{' + e + '}';
        } catch (s) {
          i.styleSheet.addRule(t, e);
        }
        document.getElementsByTagName('head')[0].appendChild(i);
      })('.ASTEROIDSBLINK .ASTEROIDSYEAHENEMY', 'outline: 2px dotted red;'),
      (this.pos = new t(100, 100)),
      (this.lastPos = !1),
      (this.vel = new t(0, 0)),
      (this.dir = new t(0, 1)),
      (this.keysPressed = {}),
      (this.firedAt = !1),
      (this.updated = {
        enemies: !1,
        flame: new Date().getTime(),
        blink: { time: 0, isActive: !1 },
      }),
      (this.scrollPos = new t(0, 0)),
      (this.bullets = []),
      (this.enemies = []),
      (this.dying = []),
      (this.totalEnemies = 0),
      (this.particles = []),
      y(),
      (r = 15),
      (c = function () {
        (i.flame.r = [[-15, -10]]), (i.flame.y = [[-15, -6]]);
        for (var t = 0; t < 20; t += 2) i.flame.r.push([-f(2, 7) - 15, t - 10]);
        for (i.flame.r.push([-15, 10]), t = 0; t < 12; t += 2.4000000000000004)
          i.flame.y.push([-f(2, 7) - 15, t - 6]);
        i.flame.y.push([-15, 6]);
      })(),
      (this.gameContainer = document.createElement('div')),
      (this.gameContainer.className = 'ASTEROIDSYEAH'),
      document.body.appendChild(this.gameContainer),
      (this.canvas = document.createElement('canvas')),
      this.canvas.setAttribute('width', o),
      this.canvas.setAttribute('height', a),
      (this.canvas.className = 'ASTEROIDSYEAH'),
      (this.canvas.style.width = o + 'px'),
      (this.canvas.style.height = a + 'px'),
      (this.canvas.style.position = 'fixed'),
      (this.canvas.style.top = '0px'),
      (this.canvas.style.left = '0px'),
      (this.canvas.style.bottom = '0px'),
      (this.canvas.style.right = '0px'),
      (this.canvas.style.zIndex = '10000'),
      'undefined' != typeof G_vmlCanvasManager
        ? ((this.canvas = G_vmlCanvasManager.initElement(this.canvas)),
          this.canvas.getContext ||
            alert('This program does not yet support your browser.'))
        : this.canvas.getContext ||
          alert('This program does not yet support your browser.'),
      x(this.canvas, 'mousedown', function (t) {
        t = t || window.event;
        const e = document.createElement('span');
        (e.style.position = 'absolute'),
          (e.style.border = '1px solid #999'),
          (e.style.background = 'white'),
          (e.style.color = 'black'),
          (e.innerHTML = 'Press Esc to quit'),
          document.body.appendChild(e);
        const i = t.pageX || t.clientX + document.documentElement.scrollLeft,
          s = t.pageY || t.clientY + document.documentElement.scrollTop;
        (e.style.left = i - e.offsetWidth / 2 + 'px'),
          (e.style.top = s - e.offsetHeight / 2 + 'px'),
          setTimeout(function () {
            try {
              e.parentNode.removeChild(e);
            } catch (t) {}
          }, 1e3);
      });
    const N = function () {
      s
        ? ((o = document.documentElement.clientWidth),
          (a = document.documentElement.clientHeight),
          n &&
            ((o = document.body.clientWidth), (a = document.body.clientHeight)),
          i.canvas.setAttribute('width', o),
          i.canvas.setAttribute('height', a))
        : ((i.canvas.style.display = 'none'),
          (o = document.documentElement.clientWidth),
          (a = document.documentElement.clientHeight),
          i.canvas.setAttribute('width', o),
          i.canvas.setAttribute('height', a),
          (i.canvas.style.display = 'block'),
          (i.canvas.style.width = o + 'px'),
          (i.canvas.style.height = a + 'px')),
        (B = !0);
    };
    if (
      (x(window, 'resize', N),
      this.gameContainer.appendChild(this.canvas),
      (this.ctx = this.canvas.getContext('2d')),
      (this.ctx.fillStyle = 'black'),
      (this.ctx.strokeStyle = 'black'),
      document.getElementById('ASTEROIDS-NAVIGATION')
        ? ((this.navigation = document.getElementById('ASTEROIDS-NAVIGATION')),
          (this.points = document.getElementById('ASTEROIDS-POINTS')))
        : ((this.navigation = document.createElement('div')),
          (this.navigation.id = 'ASTEROIDS-NAVIGATION'),
          (this.navigation.className = 'ASTEROIDSYEAH'),
          (this.navigation.style.fontFamily = 'Arial,sans-serif'),
          (this.navigation.style.position = 'fixed'),
          (this.navigation.style.zIndex = '10001'),
          (this.navigation.style.bottom = '1em'),
          (this.navigation.style.right = '1em'),
          (this.navigation.style.textAlign = 'center'),
          (this.navigation.style.background = '#005a5e'),
          (this.navigation.style.background = 'rgba(0,90,94,.8)'),
          (this.navigation.style.color = '#FFFFFF'),
          (this.navigation.style.padding = '5px'),
          (this.navigation.style.borderRadius = '1px'),
          this.gameContainer.appendChild(this.navigation),
          (this.points = document.createElement('span')),
          (this.points.id = 'ASTEROIDS-POINTS'),
          (this.points.style.font = '28pt Arial, sans-serif'),
          (this.points.style.fontWeight = 'bold'),
          (this.points.style.position = 'relative'),
          (this.points.style.textAlign = 'center'),
          (this.points.className = 'ASTEROIDSYEAH'),
          this.navigation.appendChild(this.points),
          (this.highscoreLink = document.createElement('a')),
          (this.highscoreLink.className = 'ASTEROIDSYEAH'),
          (this.scoreTitle = document.createElement('div')),
          (this.scoreTitle.style.minWidth = '100px'),
          (this.scoreTitle.style.textAlign = 'center'),
          (this.scoreTitle.innerHTML =
            'Score <br /><small>Press "esc" to quit</small>'),
          this.navigation.appendChild(this.scoreTitle)),
      n &&
        (this.gameContainer.style.position =
          this.canvas.style.position =
          this.navigation.style.position =
            'absolute'),
      T(),
      'undefined' != typeof G_vmlCanvasManager)
    )
      for (
        var D, L = this.canvas.getElementsByTagName('*'), O = 0;
        (D = L[O]);
        O++
      )
        I(D, 'ASTEROIDSYEAH');
    const R = function (t) {
      if (
        !(t = t || window.event).ctrlKey &&
        !t.shiftKey &&
        ((i.keysPressed[t.keyCode] = !0),
        t.keyCode === g(' ') && (i.firedAt = 1),
        -1 !=
          P(
            [
              g('up'),
              g('down'),
              g('right'),
              g('left'),
              g(' '),
              g('B'),
              g('W'),
              g('A'),
              g('S'),
              g('D'),
            ],
            t.keyCode,
          ))
      ) {
        if (t.ctrlKey || t.shiftKey) return;
        return (
          t.preventDefault && t.preventDefault(),
          t.stopPropagation && t.stopPropagation(),
          (t.returnValue = !1),
          (t.cancelBubble = !0),
          !1
        );
      }
    };
    x(document, 'keydown', R);
    const C = function (t) {
      if (
        ((t = t || window.event),
        -1 !=
          P(
            [
              g('up'),
              g('down'),
              g('right'),
              g('left'),
              g(' '),
              g('W'),
              g('A'),
              g('S'),
              g('D'),
            ],
            t.keyCode || t.which,
          ))
      ) {
        if (t.ctrlKey || t.shiftKey) return;
        return (
          t.preventDefault && t.preventDefault(),
          t.stopPropagation && t.stopPropagation(),
          (t.returnValue = !1),
          (t.cancelBubble = !0),
          !1
        );
      }
    };
    x(document, 'keypress', C);
    const H = function (t) {
      if (
        ((t = t || window.event),
        (i.keysPressed[t.keyCode] = !1),
        -1 !=
          P(
            [
              g('up'),
              g('down'),
              g('right'),
              g('left'),
              g(' '),
              g('B'),
              g('W'),
              g('A'),
              g('S'),
              g('D'),
            ],
            t.keyCode,
          ))
      )
        return (
          t.preventDefault && t.preventDefault(),
          t.stopPropagation && t.stopPropagation(),
          (t.returnValue = !1),
          (t.cancelBubble = !0),
          !1
        );
    };
    x(document, 'keyup', H),
      (this.ctx.clear = function () {
        this.clearRect(0, 0, o, a);
      }),
      this.ctx.clear(),
      (this.ctx.drawLine = function (t, e, i, s) {
        this.beginPath(),
          this.moveTo(t, e),
          this.lineTo(i, s),
          this.lineTo(i + 1, s + 1),
          this.closePath(),
          this.fill();
      }),
      (this.ctx.tracePoly = function (t) {
        this.beginPath(), this.moveTo(t[0][0], t[0][1]);
        for (let e = 1; e < t.length; e++) this.lineTo(t[e][0], t[e][1]);
        this.closePath();
      });
    let Y = !1;
    window.KICKASSIMG &&
      ((Y = document.createElement('img')).src = window.KICKASSIMG),
      (this.ctx.drawPlayer = function () {
        Y
          ? (this.save(),
            this.translate(i.pos.x, i.pos.y),
            this.rotate(i.dir.angle() + Math.PI / 2),
            this.drawImage(Y, -Y.width / 2, -Y.height / 2),
            this.restore())
          : (this.save(),
            this.translate(i.pos.x, i.pos.y),
            this.rotate(i.dir.angle()),
            this.tracePoly(h),
            (this.fillStyle = 'white'),
            this.fill(),
            this.tracePoly(h),
            this.stroke(),
            this.restore());
      });
    const M = 2 * Math.PI;
    (this.ctx.drawBullets = function (t) {
      for (let e = 0; e < t.length; e++)
        this.beginPath(),
          this.arc(t[e].pos.x, t[e].pos.y, 2, 0, M, !0),
          this.closePath(),
          this.fill();
    }),
      (this.ctx.drawParticles = function (t) {
        for (var e = this.fillStyle, i = 0; i < t.length; i++)
          (this.fillStyle = ['red', 'yellow'][f(0, 1)]),
            this.drawLine(
              t[i].pos.x,
              t[i].pos.y,
              t[i].pos.x - 10 * t[i].dir.x,
              t[i].pos.y - 10 * t[i].dir.y,
            );
        this.fillStyle = e;
      }),
      (this.ctx.drawFlames = function (t) {
        if (!Y) {
          this.save(),
            this.translate(i.pos.x, i.pos.y),
            this.rotate(i.dir.angle());
          const e = this.strokeStyle;
          (this.strokeStyle = 'red'),
            this.tracePoly(t.r),
            this.stroke(),
            (this.strokeStyle = 'yellow'),
            this.tracePoly(t.y),
            this.stroke(),
            (this.strokeStyle = e),
            this.restore();
        }
      });
    try {
      window.focus();
    } catch (t) {}
    A(this.pos), I(document.body, 'ASTEROIDSYEAH');
    var _ = new Date().getTime(),
      B = !1;
    this.update = function () {
      const t = new Date().getTime(),
        e = (t - _) / 1e3;
      _ = t;
      let s,
        h = !1;
      if (
        (t - this.updated.flame > 50 && (c(), (this.updated.flame = t)),
        (this.scrollPos.x =
          window.pageXOffset || document.documentElement.scrollLeft),
        (this.scrollPos.y =
          window.pageYOffset || document.documentElement.scrollTop),
        this.keysPressed[g('up')] || this.keysPressed[g('W')]
          ? (this.vel.add(this.dir.mulNew(300 * e)), (h = !0))
          : this.vel.mul(0.96),
        (this.keysPressed[g('left')] || this.keysPressed[g('A')]) &&
          ((B = !0), this.dir.rotate(m(360 * e * -1))),
        (this.keysPressed[g('right')] || this.keysPressed[g('D')]) &&
          ((B = !0), this.dir.rotate(m(360 * e))),
        this.keysPressed[g(' ')] &&
          t - this.firedAt > 150 &&
          (this.bullets.unshift({
            dir: this.dir.cp(),
            pos: this.pos.cp(),
            startVel: this.vel.cp(),
            cameAlive: t,
          }),
          (this.firedAt = t),
          this.bullets.length > p && this.bullets.pop()),
        this.keysPressed[g('B')]
          ? (this.updated.enemies || (y(), (this.updated.enemies = !0)),
            (B = !0),
            (this.updated.blink.time += 1e3 * e),
            this.updated.blink.time > 250 &&
              (this.toggleBlinkStyle(), (this.updated.blink.time = 0)))
          : (this.updated.enemies = !1),
        this.keysPressed[g('esc')])
      )
        return location.reload(), void W.apply(this);
      this.vel.len() > 600 && this.vel.setLength(600),
        this.pos.add(this.vel.mulNew(e)),
        this.pos.x > o
          ? (window.scrollTo(this.scrollPos.x + 50, this.scrollPos.y),
            (this.pos.x = 0))
          : this.pos.x < 0 &&
            (window.scrollTo(this.scrollPos.x - 50, this.scrollPos.y),
            (this.pos.x = o)),
        this.pos.y > a
          ? (window.scrollTo(this.scrollPos.x, this.scrollPos.y + 0.75 * a),
            (this.pos.y = 0))
          : this.pos.y < 0 &&
            (window.scrollTo(this.scrollPos.x, this.scrollPos.y - 0.75 * a),
            (this.pos.y = a));
      for (var r = this.bullets.length - 1; r >= 0; r--)
        if (t - this.bullets[r].cameAlive > 2e3)
          this.bullets.splice(r, 1), (B = !0);
        else {
          const t = this.bullets[r].dir
            .setLengthNew(700 * e)
            .add(this.bullets[r].startVel.mulNew(e));
          this.bullets[r].pos.add(t),
            (s = this.bullets[r].pos).x > o ? (s.x = 0) : s.x < 0 && (s.x = o),
            s.y > a ? (s.y = 0) : s.y < 0 && (s.y = a);
          const i = S(this.bullets[r].pos.x, this.bullets[r].pos.y);
          i &&
            i.tagName &&
            -1 == P(l, i.tagName.toUpperCase()) &&
            b(i) &&
            'ASTEROIDSYEAH' != i.className &&
            ((didKill = !0),
            A(this.bullets[r].pos),
            this.dying.push(i),
            this.bullets.splice(r, 1));
        }
      if (this.dying.length) {
        for (r = this.dying.length - 1; r >= 0; r--)
          try {
            this.dying[r].parentNode && window.ASTEROIDS.enemiesKilled++,
              this.dying[r].parentNode.removeChild(this.dying[r]);
            if (window.ASTEROIDS.enemiesKilled >= window.ASTEROIDS.totalEnemies - (toastyEnabled ? 1 : 0)) {
              setTimeout(function () {
                alert('\nAll your base are belong to us!\n\nYour Score: '+ (10 * window.ASTEROIDS.enemiesKilled) + '\n\nGame over');
                location.reload();
              }, 1000);
            }
          } catch (t) {}
        T(), (this.dying = []);
      } e
      for (r = this.particles.length - 1; r >= 0; r--)
        this.particles[r].pos.add(
          this.particles[r].dir.mulNew(400 * e * Math.random()),
        ),
          t - this.particles[r].cameAlive > 1e3 &&
            (this.particles.splice(r, 1), (B = !0));
      n &&
        ((this.gameContainer.style.left = this.canvas.style.left =
          document.documentElement.scrollLeft + 'px'),
        (this.gameContainer.style.top = this.canvas.style.top =
          document.documentElement.scrollTop + 'px'),
        (this.navigation.style.right = '10px'),
        (this.navigation.style.top =
          document.documentElement.scrollTop +
          document.body.clientHeight -
          this.navigation.clientHeight -
          10 +
          'px')),
        (B ||
          0 != this.bullets.length ||
          0 != this.particles.length ||
          !this.pos.is(this.lastPos) ||
          this.vel.len() > 0) &&
          (this.ctx.clear(),
          this.ctx.drawPlayer(),
          h && this.ctx.drawFlames(i.flame),
          this.bullets.length && this.ctx.drawBullets(this.bullets),
          this.particles.length && this.ctx.drawParticles(this.particles)),
        (this.lastPos = this.pos),
        (B = !1);
    };
    const K = setInterval(function () {
      i.update.call(i);
    }, 20);
    function W() {
      let t, e;
      clearInterval(K),
        E(document, 'keydown', R),
        E(document, 'keypress', C),
        E(document, 'keyup', H),
        E(window, 'resize', N),
        (t = 'ASTEROIDSYEAHSTYLES'),
        (e = document.getElementById('ASTEROIDSYEAHSTYLES')) &&
          e.parentNode.removeChild(e),
        k(document.body, 'ASTEROIDSYEAH'),
        this.highscores && this.highscores.hide(),
        this.gameContainer.parentNode.removeChild(this.gameContainer);
    }
  }
  if (
    (window.ASTEROIDSPLAYERS || (window.ASTEROIDSPLAYERS = []),
    window.ActiveXObject && !document.createElement('canvas').getContext)
  ) {
    try {
      const t = document.createElement('script');
      t.setAttribute('type', 'text/xaml'),
        (t.textContent =
          '<?xml version="1.0"?><Canvas xmlns="http://schemas.microsoft.com/client/2007"></Canvas>'),
        document.getElementsByTagName('head')[0].appendChild(t);
    } catch (t) {}
    const e = document.createElement('script');
    e.setAttribute('type', 'text/javascript'),
      (e.onreadystatechange = function () {
        ('loaded' != e.readyState && 'complete' != e.readyState) ||
          ('undefined' != typeof G_vmlCanvasManager &&
            (window.ASTEROIDSPLAYERS[window.ASTEROIDSPLAYERS.length] =
              new t()));
      }),
      (e.src = 'excanvas.js'),
      document.getElementsByTagName('head')[0].appendChild(e);
  } else window.ASTEROIDSPLAYERS[window.ASTEROIDSPLAYERS.length] = new t();
}
