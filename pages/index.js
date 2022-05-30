import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useRef, useEffect } from 'react'

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  const outputBox = useRef(null);
  const inBox = useRef(null);
  const mobileWarning = useRef(null);
  const container = useRef(null);

  const help = [
    'clear      Clear the screen',
    'about      View info about me',
    'github     View my github',
    'projects   View my previous projects',
  ];

  const commands = [
    'help',
    'clear',
    'about',
    'github',
    'projects'
  ];

  async function processCommand(cmd) {
    cmd = cmd.toLowerCase();
    console.log("Processing command: " + cmd);
    if (!commands.includes(cmd)) {
      addText("Command not found. Type 'help' for a list of commands.", cmd);
      return;
    }
    if (cmd == "help") {
      addText(help.join("<br>"), cmd);
    } else if (cmd == "about") {
      addText(`Hi there!<br>I'm <b>Vihanga Weerasinghe</b><br><br>I mostly work on back-end server-side code however also do front-end ui.<br><br><b>How can I contact you?</b><br>Discord: <b>Turtlee#2000</b><br>Twitter: <b><a&rpsp;href="https://twitter.com/Vihanganator"&rpsp;target="_blank">@Vihanganator</a></b><br>Telegram: <b><a&rpsp;href="https://t.me/Turtlee2k"&rpsp;target="_blank">@Turtlee2k</a></b><br>Email: <b><a&rpsp;href="mailto:me@vinga.xyz">me@vinga.xyz</a></b>`, cmd);
    } else if (cmd == "github") {
      addText(`A lot of my projects are open source on GitHub<br>Come check it out!<br><br><a&rpsp;href="https://github.com/vihangatheturtle"&rpsp;target="_blank">View VihangaTheTurtle on GitHub</a>`, cmd);
    } else if (cmd == "projects") {
      addText(`Over time I have had the chance to work on many amazing projects<br>Here is a list of a few projects I have worked on:<br><br><a&rpsp;href="https://discord.gg/F6mgbRF7vj"&rpsp;target="_blank">Cosmos Softwares (formerly Cosmos AIO)</a><br> - Used to be a sneaker bot but has been recently<br>   transformed into the main software development<br>   company for most of my other projects<br><br><a&rpsp;href="https://hovermint.com"&rpsp;target="_blank">Hover Mint</a><br> - NFT bot supporting MonkeLabs, CMID V2 and<br>   Fractal with upcoming support for Magic Eden<br><br><a&rpsp;href="https://filestream.cosmos-softwares.com"&rpsp;target="_blank">Cosmos FileStream</a><br> - Instant file sharing via a simple 6-digit code<br><br><a&rpsp;href="https://discord.gg/27WRy2dtNG"&rpsp;target="_blank">Coin Enterprise</a><br> - Custom and prebuilt software development for<br>   other businesses<br><br>Hover AIO (discontinued)<br> - One of my first sneaker bots I developed<br><br><a&rpsp;href="https://discord.gg/PSQaMTMwXr"&rpsp;target="_blank">Hover Raffles</a><br> - EU raffle bot supporting 7 sites<br><br><a&rpsp;href="https://solanaroyale.com"&rpsp;target="_blank">Solana Royale</a><br> - Next-gen Solana based online casino`, cmd)
    } else if (cmd == "clear") {
      outputBox.current.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(_)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>__&nbsp;&nbsp;&nbsp;___&nbsp;_&nbsp;__&nbsp;&nbsp;&nbsp;__&nbsp;_&nbsp;&nbsp;__&nbsp;_&nbsp;<br>\\&nbsp;\\&nbsp;/&nbsp;/&nbsp;|&nbsp;'_&nbsp;\\&nbsp;/&nbsp;_`&nbsp;|/&nbsp;_`&nbsp;|<br>&nbsp;\\&nbsp;V&nbsp;/|&nbsp;|&nbsp;|&nbsp;|&nbsp;|&nbsp;(_|&nbsp;|&nbsp;(_|&nbsp;|<br>&nbsp;&nbsp;\\_/&nbsp;|_|_|&nbsp;|_|\\__,&nbsp;|\\__,_|<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;__/&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|___/&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;<br>Welcome&nbsp;to&nbsp;my&nbsp;<b>portfolio</b>&nbsp;terminal!<br>Type&nbsp;<b>help</b>&nbsp;to&nbsp;see&nbsp;a&nbsp;list&nbsp;of&nbsp;commands.<br>";
    }
  }

  function addText(t, cmd, noNewLine = false, dontAddCommandLine = false) {
    t = t.split(' ').join('&nbsp;');
    if (!noNewLine)
      t = "<br>" + t;
    if (!dontAddCommandLine)
      t = `<br><span className="input" style="float: left; word-wrap: break-word; width: 100%;"><span style="color: lime">visitor@vinga.xyz</span>:<span style="color: CornflowerBlue">~</span>$&nbsp;${cmd}</span>` + t;
    outputBox.current.innerHTML += t.split('\n').join('<br>').split('&rpsp;').join(' ');
  }

  useEffect(() => {
    let isInMobile = Boolean(navigator.userAgent.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    ))
    if (!isInMobile) {
      document.getElementsByClassName("input")[0].style.display = "block";
      inBox.current.focus();
      inBox.current.addEventListener('blur', (e) => {
        inBox.current.focus();
      });
      inBox.current.addEventListener('keydown', (e) => {
        if (e.keyCode == 13) {
          if (e.target.value !== "") {
            processCommand(e.target.value.toString());
            e.target.value = "";
            e.preventDefault();
          }
        }
      });
    } else {
      setIsMobile(true);
    }
    container.current.style.opacity = 1;
  }, []);

  useEffect(() => {
    if (isMobile) {
      mobileWarning.current.style.height = window.innerHeight + "px";
    }
  }, [isMobile]);

  return (
    <div ref={container} style={{opacity: 0, transition: ".3s"}} className={styles.container}>
      {!isMobile ? (
        <>
          <span className="output" ref={outputBox} dangerouslySetInnerHTML={{__html: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(_)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>__&nbsp;&nbsp;&nbsp;___&nbsp;_&nbsp;__&nbsp;&nbsp;&nbsp;__&nbsp;_&nbsp;&nbsp;__&nbsp;_&nbsp;<br>\\&nbsp;\\&nbsp;/&nbsp;/&nbsp;|&nbsp;'_&nbsp;\\&nbsp;/&nbsp;_`&nbsp;|/&nbsp;_`&nbsp;|<br>&nbsp;\\&nbsp;V&nbsp;/|&nbsp;|&nbsp;|&nbsp;|&nbsp;|&nbsp;(_|&nbsp;|&nbsp;(_|&nbsp;|<br>&nbsp;&nbsp;\\_/&nbsp;|_|_|&nbsp;|_|\\__,&nbsp;|\\__,_|<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;__/&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|___/&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;<br>Welcome&nbsp;to&nbsp;my&nbsp;<b>portfolio</b>&nbsp;terminal!<br>Type&nbsp;<b>help</b>&nbsp;to&nbsp;see&nbsp;a&nbsp;list&nbsp;of&nbsp;commands.<br>"}} />
          <br />
          <span className="input" style={{float: "left"}}><span style={{color: "lime"}}>visitor@vinga.xyz</span>:<span style={{color: "CornflowerBlue"}}>~</span>$&nbsp;</span>
          <input style={{width: "calc(100% - 200px)", float: "left"}} ref={inBox} />
        </>
      ) : (
        <div ref={mobileWarning} style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%"}}>
          <span style={{color: "white", width: "100%", textAlign: "center"}}>
            This experience is best viewed on a computer
          </span>
        </div>
      )}
    </div>
  )
}
