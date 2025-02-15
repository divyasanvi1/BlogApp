import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; // Ensure package is installed

const App = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        console.log("🔄 Initializing Particle Engine...");
        initParticlesEngine(async (engine) => {
            try {
                await loadSlim(engine);
                console.log("✅ Particles Engine Loaded Successfully!");
            } catch (error) {
                console.error("❌ Failed to load particles engine:", error);
            }
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = (container) => {
        console.log("🎉 Particles Loaded:", container);
    };

    return (
        <>
            {init && (
                <Particles
                    id="tsparticles"
                    particlesLoaded={particlesLoaded}
                    options={{
                        background: {
                            color: { value: "#000000" },
                        },
                        fpsLimit: 120,
                        interactivity: {
                            events: {
                                onClick: { enable: true, mode: "push" },
                                onHover: { enable: true, mode: "repulse" },
                                resize: true,
                            },
                            modes: {
                                push: { quantity: 4 },
                                repulse: { distance: 200, duration: 0.4 },
                            },
                        },
                        particles: {
                            color: { value: "#AAAAAA" },
                            links: {
                                color: "#AAAAAA",
                                distance: 80,
                                enable: true,
                                opacity: 0.8,
                                width: 1,
                            },
                            move: {
                                direction: "none",
                                enable: true,
                                outModes: { default: "bounce" },
                                speed: 2,
                            },
                            number: {
                                density: { enable: true, area: 800 },
                                value: 650,
                            },
                            opacity: { value: 0.5 },
                            shape: { type: "circle" },
                            size: { value: { min: 1, max: 5 } },
                        },
                        detectRetina: true,
                    }}
                />
            )}
        </>
    );
};

export default App;
