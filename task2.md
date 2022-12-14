# Fixing frontend errors in Wavesurfer.js
Once you finish the `create user` feature, go ahead and log into the site. You will be met with a fully completed page to upload audio clips. To start testing, let's do the following:   
1. Find some audio clips.  
    - Feel free to find some audio clips on [Xeno-canto](https://xeno-canto.org/) or download our [selected Xeno-canto test dataset](https://drive.google.com/drive/u/0/folders/1lIweB8rF9JZhu6imkuTg_No0i04ClDh1) used in our [PyHa demos](https://github.com/UCSD-E4E/PyHa). 
    - We often get a large amount of Xeno-canto clips to help us gather some extra datasets to work with. Click here and download some [Screaming Piha clips you like](https://xeno-canto.org/species/Lipaugus-vociferans). 
2. Upload the audio clips, and then hit annotate. 
    - You should be greeted with a spectrogram of your audio. Go ahead and play around a little bit. 
    - You can drag and click on the spectrogram to make annotations of bird calls (in Pyrelite they are automatically labeled as a bird, in Pyrenote they are manually labeled). The spectrogram itself is rendered by the [`wavesurfer.js`](https://wavesurfer-js.org/) React library. 
    - Feel free to look at the site to learn more!

However, you may notice that there are a few weird visual bugs. These bugs include:
- Spectrogram doesn't move with the timeline
- Regions cannot be made in the first section
- A waveform blocks spectrogram when running

To solve, these issues, we can look at these two files:
- `src\frontend\src\css\index.CSS`
- `src\frontend\src\pages\annotate.js`

Your task is to attempt to fix these various issues. 
(This is based on a very real issue that took me way longer to fix than I would have liked the first time I encountered the bugs)

**Hints**: 
- Try playing around with the position and float values of the various wavesurfer-related containers such as waveform to timeline in index.css
- Look up `wavesurfer.js` documentation for attributes to `wavesurfer.create()` that could change a property that could make the `wavesurfer.js` functionally invisible. 
- The inspect tool on your browser can allow you to change the styling of an element in real-time, use this to try and play around with the position and float of the various wavesurfer containers to try and solve the spectrogram alignment issues

**Task 3**
- Finished? [Go to the next task](./task3.md)