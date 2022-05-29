import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useRef, useEffect } from 'react'

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  const outputBox = useRef(null);
  const inBox = useRef(null);
  const mobileWarning = useRef(null);

  const help = [
    '<b>about</b>      about me',
  ];

  const commands = [
    'help'
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
    }
  }

  function addText(t, cmd, noNewLine = false, dontAddCommandLine = false) {
    t = t.split(' ').join('&nbsp;');
    if (!noNewLine)
      t = "<br>" + t;
    if (!dontAddCommandLine)
      t = `<br><span className="input"><span style="color: lime">visitor@vinga.xyz</span>:<span style="color: CornflowerBlue">~</span>$ ${cmd}</span>` + t;
    outputBox.current.innerHTML += t.split('\n').join('<br>');
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
      setTimeout(() => {
        mobileWarning.current.style.height = window.innerHeight + "px";
      }, 250);
    }
  }, []);

  return (
    <div className={styles.container}>
      {!isMobile ? (
        <>
          <span className="output" ref={outputBox} dangerouslySetInnerHTML={{__html: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(_)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>__&nbsp;&nbsp;&nbsp;___&nbsp;_&nbsp;__&nbsp;&nbsp;&nbsp;__&nbsp;_&nbsp;&nbsp;__&nbsp;_&nbsp;<br>\\&nbsp;\\&nbsp;/&nbsp;/&nbsp;|&nbsp;'_&nbsp;\\&nbsp;/&nbsp;_`&nbsp;|/&nbsp;_`&nbsp;|<br>&nbsp;\\&nbsp;V&nbsp;/|&nbsp;|&nbsp;|&nbsp;|&nbsp;|&nbsp;(_|&nbsp;|&nbsp;(_|&nbsp;|<br>&nbsp;&nbsp;\\_/&nbsp;|_|_|&nbsp;|_|\\__,&nbsp;|\\__,_|<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;__/&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|___/&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;<br>Welcome&nbsp;to&nbsp;my&nbsp;<b>portfolio</b>&nbsp;terminal!<br>Type&nbsp;<b>help</b>&nbsp;to&nbsp;see&nbsp;a&nbsp;list&nbsp;of&nbsp;commands.<br>"}} />
          <br />
          <span className="input"><span style={{color: "lime"}}>visitor@vinga.xyz</span>:<span style={{color: "CornflowerBlue"}}>~</span>$ <input style={{width: "calc(100% - 200px)"}} ref={inBox} /></span>
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
