import React, { useState } from 'react'
import {NextPage} from 'next'
import { Box } from 'rebass';
import styles from '../styles/Home.module.css'
interface SliderProps {
    x: any;
    i: any;
    tempoSlider: any;
    min: any;
    max: any;
    value: any;
    change: any;
}


export const Slider: NextPage<SliderProps> = ({x, i, tempoSlider, min, max, value, change}) => {

    const [hover, setHover] = useState({
        mouseX: null,
        mouseY: null,
        hover: null,
      });

      function setText(e) {
        switch(e) {
          case 'DANCEABILITY':
            return 'Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity.'
            case 'LIVENESS':
              return 'Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live.'
            case 'ENERGY':
              return 'Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale.'
            case 'VALENCE':
              return 'Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).'
            case 'LOUDNESS':
              return 'The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks.'
            case 'INSTRUMENTAL':
              return 'Predicts whether a track contains no vocals. “Ooh” and “aah” sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly “vocal”. Higher the number, the less focus'
            case 'ACOUSTIC':
              return 'Tracks with high acoustic sound more acoustic (e.g. stripped of electric sounds), while tracks with low acoustic sound more elecronic and digital.'
            case 'TEMPO':
              return 'The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.'
        }
    
      }

        return (<Box key={i} onMouseEnter={(e) => setHover({
      mouseX: e.screenX,
      mouseY: e.screenY,
      hover: true
    })} onMouseLeave={(e) => setHover({
      mouseX: null,
      mouseY: null,
      hover: false
    })}>
      {hover.hover && <Box sx={{
   position: 'fixed',
   width: '100%',
   top: 0,
   left: 0,
   padding: 3,
   bg: 'yellowText',
   color: 'black',
   fontWeight: 600
 }}>
   {setText(x.sn.substr(0, x.sn.length - 6).toUpperCase())}
 </Box>}
      <Box color="yellowText" as="label" sx={{fontWeight: 600}}>
                  {x.sn.substr(0, x.sn.length - 6).toUpperCase()}
                </Box>
                <Box color="#FFFFFF40"  as="pre">
                  {x.name === tempoSlider
                    ? x.name / 100 + " BPM"
                    : x.sn === 'loudnessSlider' ? x.name + 'db': x.name + "%"}
                </Box>
      <Box as="input" sx={{
      appearance: 'unset',
      backgroundColor: 'transparent',
      margin:' 10px 0',
      color: 'yellowText',
  width: '100%'
  // @ts-ignore
    }} type="range"  min={min} max={max} value={value} onChange={(e) => change(e.target.value)} />
    </Box>);
}