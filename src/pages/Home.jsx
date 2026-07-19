import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { WebGLShader } from "../components/ui/web-gl-shader";
import { LiquidButton } from "../components/ui/liquid-glass-button";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden">
      {/* WebGL Shader Background */}
      <WebGLShader />

      {/* Hero Content */}
      <div className="relative z-10 w-full px-6 pt-32 pb-40 md:px-12 lg:px-16 flex flex-col justify-center h-full">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <h1 className="animate-fade-rise font-display text-5xl font-medium leading-[0.95] tracking-[-2.46px] text-white sm:text-6xl md:text-7xl lg:text-8xl max-w-5xl">
            Every <em className="not-italic text-muted-foreground">reasoning chain</em>,{" "}
            <em className="not-italic text-muted-foreground">watched closely</em>.
          </h1>

          <p className="mt-6 mb-10 max-w-2xl animate-fade-rise text-base leading-relaxed text-white/80 sm:text-lg md:text-xl" style={{ animationDelay: '0.2s' }}>
            Argus audits the reasoning behind every AI-generated answer - surfacing contradictions, unfaithful conclusions, and quietly misleading logic, in any domain, without retraining.
          </p>
          
          <div className="mt-6 animate-fade-rise" style={{ animationDelay: '0.4s' }}>
            <LiquidButton 
              size="xxl"
              onClick={() => navigate('/demo')}
            >
              Audit a reasoning chain
            </LiquidButton>
          </div>
        </div>
      </div>
    </div>
  );
}
