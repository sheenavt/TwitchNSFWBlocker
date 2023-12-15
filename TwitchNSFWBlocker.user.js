
// ==UserScript==
// @name            TwitchNSFWBlocker
// @namespace       http://tampermonkey.net/
// @version         0.1
// @description     An simple script that remove NSFW streams from appearing in category or tag view
// @author          ksheena0
// @match           https://www.twitch.tv/directory/*
// @grant           GM_log
// @license         MIT
// ==/UserScript==

addEventListener("load", main)

function block() {
    let NSFWTags = ['NSFWartist']
    let NSFWTitles = ['18+', '+18']
    let streams = document.querySelectorAll('div[style*="order"]')
    for( let i = 1; i < streams.length; i++) {
        let title = streams[i].getElementsByTagName('h3')[0].innerText
        let tags = streams[i].getElementsByClassName('tw-tag')
        if(title) {
            if (NSFWTitles.some(t => title.includes(t))) {
                let parent = streams[i].parentNode
                parent.removeChild(streams[i])
                console.log("removed stream")
                console.log(title)
            }
        }

        if(tags && tags.length > 0) {
            for( let j = 1; j < tags.length; j++) {
                if(NSFWTags.includes(tags[j].innerText)) {
                    let parent = streams[i].parentNode
                    parent.removeChild(streams[i])
                    break
                }
            }
        }
    }
}

function main() {
    'use strict'
    block();
};
