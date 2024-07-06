// FiveForces.js
import React, { useEffect } from 'react';
import { FirstForce } from './Forces/FirstForce';
import { SecondForce } from './Forces/SecondForce';
import { ThirdForce } from './Forces/ThreeForce';
import { FourthForce } from './Forces/FourthForce';
import { FifthForce } from './Forces/FiveForce';
import '@/components/StockValuationHome/UnderstandingBusiness/ForceDropdown.module.css'

export function ForceDropdown() {
    // First Force
    useEffect(() => {
    
        const subtitle = document.getElementsByClassName("force-get-started-1-subtitle")[0];
    
        const createWord = (text, index) => {
          const word = document.createElement("span");
    
          word.innerHTML = `${text} `;
    
          word.classList.add("force-get-started-1-subtitle-word");
    
          word.style.transitionDelay = `${index * 40}ms`;
    
          return word;
        };
        
    
        const addWord = (text, index) => subtitle.appendChild(createWord(text, index));
    
        const createSubtitle = (text) => text.split(" ").map(addWord);
        
    
        createSubtitle("The risk of new competitors entering the market and potentially taking away customers and market share from existing companies.")
    
      }, []);
    // Second Force
    useEffect(() => {
    
        const subtitle = document.getElementsByClassName("force-get-started-2-subtitle")[0];
    
        const createWord = (text, index) => {
          const word = document.createElement("span");
    
          word.innerHTML = `${text} `;
    
          word.classList.add("force-get-started-2-subtitle-word");
    
          word.style.transitionDelay = `${index * 40}ms`;
    
          return word;
        };
        
    
        const addWord = (text, index) => subtitle.appendChild(createWord(text, index));
    
        const createSubtitle = (text) => text.split(" ").map(addWord);
        
    
        createSubtitle("The ability of customers to influence pricing and terms by demanding better products or lower prices from sellers.")
    
      }, []);
    // Third Force
    useEffect(() => {
    
        const subtitle = document.getElementsByClassName("force-get-started-3-subtitle")[0];
    
        const createWord = (text, index) => {
          const word = document.createElement("span");
    
          word.innerHTML = `${text} `;
    
          word.classList.add("force-get-started-3-subtitle-word");
    
          word.style.transitionDelay = `${index * 40}ms`;
    
          return word;
        };
        
    
        const addWord = (text, index) => subtitle.appendChild(createWord(text, index));
    
        const createSubtitle = (text) => text.split(" ").map(addWord);
        
    
        createSubtitle("The ability of suppliers to impact the costs and availability of resources or inputs that companies need to produce goods or services.")
    
      }, []);
    // Fourth Force
    useEffect(() => {
    
        const subtitle = document.getElementsByClassName("force-get-started-4-subtitle")[0];
    
        const createWord = (text, index) => {
          const word = document.createElement("span");
    
          word.innerHTML = `${text} `;
    
          word.classList.add("force-get-started-4-subtitle-word");
    
          word.style.transitionDelay = `${index * 40}ms`;
    
          return word;
        };
        
    
        const addWord = (text, index) => subtitle.appendChild(createWord(text, index));
    
        const createSubtitle = (text) => text.split(" ").map(addWord);
        
    
        createSubtitle("The possibility of alternative products or services fulfilling the same needs as the ones offered by existing companies and attracting customers away from them.")
    
      }, []);
    // Fifth Force
    useEffect(() => {
    
        const subtitle = document.getElementsByClassName("force-get-started-5-subtitle")[0];
    
        const createWord = (text, index) => {
          const word = document.createElement("span");
    
          word.innerHTML = `${text} `;
    
          word.classList.add("force-get-started-5-subtitle-word");
    
          word.style.transitionDelay = `${index * 40}ms`;
    
          return word;
        };
        
    
        const addWord = (text, index) => subtitle.appendChild(createWord(text, index));
    
        const createSubtitle = (text) => text.split(" ").map(addWord);
        
    
        createSubtitle("The intensity of competition between existing companies in a market, which can lead to price wars, aggressive marketing, and a constant struggle for market dominance.")
    
      }, []);
  return (
    <div>
        {/* First Force */}
        <div className="force-grid-container">
        <div className="force-left-box">
                <div className='force-get-started-1'>
                    <div className='force-get-started-1-content'>
                        <h5 className='force-get-started-1-title'>1. The Threat of New Entrants</h5>
                        <div className='force-get-started-1-subtitle'></div>
                    </div>
                </div>
        </div>
        <div className="force-right-box">
            <FirstForce />
        </div>
        </div>
        {/* Second Force */}
        <div className="force-grid-container">
        <div className="force-left-box">
                <div className='force-get-started-2'>
                    <div className='force-get-started-2-content'>
                        <h5 className='force-get-started-2-title'>2. The Bargaining Power of Buyers</h5>
                        <div className='force-get-started-2-subtitle'></div>
                    </div>
                </div>
        </div>
        <div className="force-right-box">
            <SecondForce />
        </div>
        </div>
        {/* Third Force */}
        <div className="force-grid-container">
        <div className="force-left-box">
                <div className='force-get-started-3'>
                    <div className='force-get-started-3-content'>
                        <h5 className='force-get-started-3-title'>3. The Bargaining Power of Suppliers</h5>
                        <div className='force-get-started-3-subtitle'></div>
                    </div>
                </div>
        </div>
        <div className="force-right-box">
            <ThirdForce />
        </div>
        </div>
        {/* Fourth Force */}
        <div className="force-grid-container">
        <div className="force-left-box">
                <div className='force-get-started-4'>
                    <div className='force-get-started-4-content'>
                        <h5 className='force-get-started-4-title'>4. The Threat of Substitute Products or Services</h5>
                        <div className='force-get-started-4-subtitle'></div>
                    </div>
                </div>
        </div>
        <div className="force-right-box">
            <FourthForce />
        </div>
        </div>
        {/* Fifth Force */}
        <div className="force-grid-container">
        <div className="force-left-box">
                <div className='force-get-started-5'>
                    <div className='force-get-started-5-content'>
                        <h5 className='force-get-started-5-title'>5. Competitive Rivalry among Existing Competitors</h5>
                        <div className='force-get-started-5-subtitle'></div>
                    </div>
                </div>
        </div>
        <div className="force-right-box">
            <FifthForce />
        </div>
        </div>
    </div>
  );
};

