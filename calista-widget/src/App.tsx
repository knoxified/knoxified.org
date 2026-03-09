import { useEffect, useMemo, useState } from "react"
import { Webchat, WebchatProvider } from "@botpress/webchat"

import calistaAvatar from "./assets/calista.png"
import amaraAvatar from "./assets/Amara.png"
import noahAvatar from "./assets/Noah.png"

const clientId = "f004f977-d4af-4da7-a5db-68ec3ecce7ca"

const personas = {
  calista: {
    name: "Calista",
    role: "AI Automation Strategist",
    avatar: calistaAvatar,
  },
  amara: {
    name: "Amara",
    role: "Client Success Specialist",
    avatar: amaraAvatar,
  },
  noah: {
    name: "Noah",
    role: "Systems Architect",
    avatar: noahAvatar,
  },
}

function getPersonaKey() {
  const stored = sessionStorage.getItem("knoxified_persona")

  if (stored && stored in personas) {
    return stored as keyof typeof personas
  }

  const keys = Object.keys(personas) as Array<keyof typeof personas>
  const randomKey = keys[Math.floor(Math.random() * keys.length)]

  sessionStorage.setItem("knoxified_persona", randomKey)

  return randomKey
}

export default function App() {
  const [open, setOpen] = useState(false)
  const [booting, setBooting] = useState(true)
  const [showPersona, setShowPersona] = useState(false)
  const [personaKey, setPersonaKey] = useState<keyof typeof personas>("calista")

  useEffect(() => {
    setPersonaKey(getPersonaKey())
  }, [])

  const persona = useMemo(() => personas[personaKey], [personaKey])

  useEffect(() => {
    if (!open) {
      setBooting(true)
      setShowPersona(false)
      return
    }

    const revealPersonaTimer = window.setTimeout(() => {
      setShowPersona(true)
    }, 3000)

    const bootingTimer = window.setTimeout(() => {
      setBooting(false)
    }, 5000)

    return () => {
      window.clearTimeout(revealPersonaTimer)
      window.clearTimeout(bootingTimer)
    }
  }, [open])

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <WebchatProvider clientId={clientId}>
        <button
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Open chat"
          style={{
            position: "fixed",
            right: "20px",
            bottom: "20px",
            width: "64px",
            height: "64px",
            borderRadius: "999px",
            border: "none",
            background: "#2563EB",
            boxShadow: "0 10px 30px rgba(0,0,0,0.22)",
            cursor: "pointer",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M8 10h8M8 14h5M7 19l-3 2V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H7Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <span
            style={{
              position: "absolute",
              right: "6px",
              bottom: "6px",
              width: "12px",
              height: "12px",
              borderRadius: "999px",
              background: "#22C55E",
              border: "2px solid white",
            }}
          />
        </button>

        {open && (
          <div
            style={{
              position: "fixed",
              right: "20px",
              bottom: "94px",
              width: "380px",
              height: "600px",
              maxWidth: "calc(100vw - 20px)",
              maxHeight: "calc(100vh - 110px)",
              borderRadius: "18px",
              overflow: "hidden",
              background: "#fff",
              boxShadow: "0 16px 45px rgba(0,0,0,0.24)",
              zIndex: 9998,
            }}
          >
            {booting ? (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "24px",
                  boxSizing: "border-box",
                  fontFamily: "Inter, Arial, sans-serif",
                  background:
                    "linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "84px",
                    height: "84px",
                    marginBottom: "18px",
                  }}
                >
                  {showPersona ? (
                    <img
                      src={persona.avatar}
                      alt={persona.name}
                      style={{
                        width: "84px",
                        height: "84px",
                        borderRadius: "999px",
                        objectFit: "cover",
                        display: "block",
                        boxShadow: "0 8px 25px rgba(37,99,235,0.18)",
                      }}
                    />
                  ) : (
                    <div
                      aria-label="Connecting"
                      style={{
                        width: "84px",
                        height: "84px",
                        borderRadius: "999px",
                        background: "#111111",
                        display: "block",
                        boxShadow: "0 8px 25px rgba(0,0,0,0.18)",
                      }}
                    />
                  )}

                  <span
                    style={{
                      position: "absolute",
                      left: "50%",
                      transform: "translateX(-50%)",
                      bottom: "-4px",
                      width: "12px",
                      height: "12px",
                      borderRadius: "999px",
                      background: "#22C55E",
                      border: "2px solid white",
                    }}
                  />
                </div>

                {showPersona ? (
                  <>
                    <div
                      style={{
                        color: "#2563EB",
                        fontSize: "16px",
                        fontWeight: 600,
                        marginBottom: "4px",
                      }}
                    >
                      {persona.name}
                    </div>

                    <div
                      style={{
                        color: "#6B7280",
                        fontSize: "13px",
                        marginBottom: "14px",
                      }}
                    >
                      {persona.role}
                    </div>
                  </>
                ) : (
                  <div
                    style={{
                      color: "#2563EB",
                      fontSize: "15px",
                      fontWeight: 600,
                      marginBottom: "14px",
                      textTransform: "lowercase",
                    }}
                  >
                    connecting you
                  </div>
                )}

                <div style={{ display: "flex", gap: "8px" }}>
                  <span className="calista-dot" />
                  <span className="calista-dot" />
                  <span className="calista-dot" />
                </div>

                <style>
                  {`
                    .calista-dot {
                      width: 10px;
                      height: 10px;
                      border-radius: 999px;
                      background: #22C55E;
                      opacity: 0.25;
                      animation: calistaBlink 1.2s infinite ease-in-out;
                    }
                    .calista-dot:nth-child(2) { animation-delay: 0.18s; }
                    .calista-dot:nth-child(3) { animation-delay: 0.36s; }

                    @keyframes calistaBlink {
                      0%, 100% { opacity: 0.25; transform: translateY(0); }
                      50% { opacity: 1; transform: translateY(-2px); }
                    }

                    @media (max-width: 768px) {
                      .calista-mobile-chat {
                        right: 10px !important;
                        bottom: 10px !important;
                        width: calc(100vw - 20px) !important;
                        height: calc(100vh - 20px) !important;
                        max-width: calc(100vw - 20px) !important;
                        max-height: calc(100vh - 20px) !important;
                        border-radius: 18px !important;
                      }
                    }
                  `}
                </style>
              </div>
            ) : (
              <div
                className="calista-mobile-chat"
                style={{ width: "100%", height: "100%" }}
              >
                <Webchat
                  clientId={clientId}
                  configuration={{
                    botName: persona.name,
                    botAvatar: persona.avatar,
                    color: "#2563EB",
                  }}
                />
              </div>
            )}
          </div>
        )}
      </WebchatProvider>
    </div>
  )
}