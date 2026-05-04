import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { useState, useEffect } from 'react'

interface Agent {
  id: string
  name: string
  description: string
  category: string
  status: 'active' | 'idle' | 'offline'
  contractAddress: string
  twitter?: string
  website?: string
  logo: string
}

const AGENTS: Agent[] = [
  {
    id: '1',
    name: 'Virtuals Protocol',
    description: 'Create, own, and co-earn with AI agents. The leading AI agent launchpad on Base.',
    category: 'LAUNCHPAD',
    status: 'active',
    contractAddress: '0x0b3e328455c4059EEb9e3f84b5543F74E24e7E1b',
    twitter: 'virtaboreal',
    website: 'https://virtuals.io',
    logo: '🌐'
  },
  {
    id: '2',
    name: 'AIXBT',
    description: 'AI-powered crypto intelligence agent providing real-time market analysis and alpha.',
    category: 'INTELLIGENCE',
    status: 'active',
    contractAddress: '0x4F9Fd6Be4a90f2620860d680c0d4d5Fb53d1A825',
    twitter: 'aixbt_agent',
    website: 'https://aixbt.tech',
    logo: '🤖'
  },
  {
    id: '3',
    name: 'LUNA by Virtuals',
    description: 'Autonomous AI influencer and content creator with her own personality and goals.',
    category: 'SOCIAL',
    status: 'active',
    contractAddress: '0x55cD6469F597452B5A7536e2CD98fDE4c1247ee4',
    twitter: 'luna_virtuals',
    logo: '🌙'
  },
  {
    id: '4',
    name: 'GAME by Virtuals',
    description: 'Gaming AI agent framework enabling autonomous NPCs and game companions.',
    category: 'GAMING',
    status: 'active',
    contractAddress: '0x1C4CcA7C5DB003824208aDDA61bD749e55F463a3',
    twitter: 'game_virtuals',
    logo: '🎮'
  },
  {
    id: '5',
    name: 'VaderAI',
    description: 'DeFi trading agent with autonomous portfolio management capabilities.',
    category: 'DEFI',
    status: 'active',
    contractAddress: '0x2f7Ee366567D8FFa0E514d5dF74F5B5acf9bD96E',
    twitter: 'VaderAI_',
    logo: '⚔️'
  },
  {
    id: '6',
    name: 'ACOLYT',
    description: 'AI agent specializing in on-chain data analysis and wallet tracking.',
    category: 'ANALYTICS',
    status: 'active',
    contractAddress: '0x79dacb99A8698F225F0C99Bb89C1e3Da02E3FC3C',
    twitter: 'aikibase',
    logo: '📊'
  },
  {
    id: '7',
    name: 'Sekoia',
    description: 'Autonomous AI researcher agent focused on crypto ecosystem mapping.',
    category: 'RESEARCH',
    status: 'idle',
    contractAddress: '0x0D7127B29E9c65d84F78DC6f7e54e0A7b5B1c4cF',
    twitter: 'SekoiaAI',
    logo: '🔬'
  },
  {
    id: '8',
    name: 'CLANKER',
    description: 'Autonomous token deployer agent. Mention it to launch tokens on Base.',
    category: 'DEPLOYER',
    status: 'active',
    contractAddress: '0x1bc0c42215582d5A085795f4baDbaC3ff36d1Bcb',
    twitter: 'caboreal',
    logo: '⚙️'
  },
  {
    id: '9',
    name: 'HIGHER',
    description: 'Community-driven AI agent promoting positive vibes and higher consciousness.',
    category: 'COMMUNITY',
    status: 'active',
    contractAddress: '0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe',
    twitter: 'highercoin',
    logo: '↑'
  },
  {
    id: '10',
    name: 'KWENTA',
    description: 'Perpetual futures trading interface with AI-assisted position management.',
    category: 'TRADING',
    status: 'active',
    contractAddress: '0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2',
    twitter: 'kwaboreal',
    logo: '📈'
  },
  {
    id: '11',
    name: 'Bankr',
    description: 'Your AI-powered crypto wallet assistant for trading, swaps, and portfolio management.',
    category: 'WALLET',
    status: 'active',
    contractAddress: '0x22aF33FE49fD1Fa80c7149773dDe5890D3c76F3b',
    twitter: 'bankaboreal',
    website: 'https://bankr.bot',
    logo: '🏦'
  },
  {
    id: '12',
    name: 'SIMMI',
    description: 'AI girlfriend agent with conversational abilities and emotional intelligence.',
    category: 'COMPANION',
    status: 'idle',
    contractAddress: '0x56072C95FAA701256059aa122697B133aDEd9279',
    twitter: 'simmi_io',
    logo: '💝'
  }
]

function TypewriterText({ text, delay = 30 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    setDisplayed('')
    setDone(false)
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        setDone(true)
        clearInterval(interval)
      }
    }, delay)
    return () => clearInterval(interval)
  }, [text, delay])

  return (
    <span>
      {displayed}
      {!done && <span className="animate-pulse">▋</span>}
    </span>
  )
}

function AgentCard({ agent, index }: { agent: Agent; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const truncatedAddress = `${agent.contractAddress.slice(0, 6)}...${agent.contractAddress.slice(-4)}`

  return (
    <div
      className="relative group"
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r from-[#00ff41] to-[#00cc33] rounded-lg blur opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />

      <div className="relative bg-[#0a0a0a] border border-[#00ff41]/30 rounded-lg p-4 md:p-5 hover:border-[#00ff41] transition-all duration-300 h-full">
        {/* Status indicator */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${
            agent.status === 'active' ? 'bg-[#00ff41] animate-pulse shadow-[0_0_10px_#00ff41]' :
            agent.status === 'idle' ? 'bg-yellow-500' : 'bg-red-500'
          }`} />
          <span className="text-[10px] font-mono uppercase text-[#00ff41]/60">{agent.status}</span>
        </div>

        {/* Category tag */}
        <div className="inline-block px-2 py-0.5 bg-[#00ff41]/10 border border-[#00ff41]/30 rounded text-[10px] font-mono text-[#00ff41] mb-3">
          [{agent.category}]
        </div>

        {/* Logo and name */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl md:text-3xl">{agent.logo}</span>
          <h3 className="font-mono text-lg md:text-xl text-white font-bold tracking-tight">
            {isHovered ? <TypewriterText text={agent.name} delay={40} /> : agent.name}
          </h3>
        </div>

        {/* Description */}
        <p className="text-[#00ff41]/70 text-xs md:text-sm font-mono leading-relaxed mb-4 line-clamp-2">
          {`> ${agent.description}`}
        </p>

        {/* Contract address */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[#00ff41]/40 text-[10px] font-mono">CONTRACT:</span>
          <a
            href={`https://basescan.org/address/${agent.contractAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00ff41] text-xs font-mono hover:underline"
          >
            {truncatedAddress}
          </a>
        </div>

        {/* Links */}
        <div className="flex gap-3">
          {agent.twitter && (
            <a
              href={`https://twitter.com/${agent.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-1.5 bg-[#00ff41]/10 border border-[#00ff41]/30 rounded text-[#00ff41] text-xs font-mono hover:bg-[#00ff41]/20 transition-colors"
            >
              <span>𝕏</span>
              <span className="hidden sm:inline">@{agent.twitter}</span>
            </a>
          )}
          {agent.website && (
            <a
              href={agent.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-1.5 bg-[#00ff41]/10 border border-[#00ff41]/30 rounded text-[#00ff41] text-xs font-mono hover:bg-[#00ff41]/20 transition-colors"
            >
              <span>⌘</span>
              <span className="hidden sm:inline">WEBSITE</span>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

function ScanLine() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,255,65,0.02)_50%)] bg-[length:100%_4px]" />
      <div className="absolute inset-0 animate-scan bg-gradient-to-b from-transparent via-[#00ff41]/5 to-transparent" style={{ height: '10%' }} />
    </div>
  )
}

function MatrixRain() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-10">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute text-[#00ff41] font-mono text-xs animate-matrix-fall whitespace-nowrap"
          style={{
            left: `${i * 5}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${10 + Math.random() * 10}s`
          }}
        >
          {Array.from({ length: 30 }).map((_, j) => (
            <div key={j} style={{ opacity: Math.random() }}>
              {String.fromCharCode(0x30A0 + Math.random() * 96)}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

function App() {
  const { isConnected, address } = useAccount()
  const [filter, setFilter] = useState<string>('ALL')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = ['ALL', ...new Set(AGENTS.map(a => a.category))]

  const filteredAgents = AGENTS.filter(agent => {
    const matchesCategory = filter === 'ALL' || agent.category === filter
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-x-hidden">
      <ScanLine />
      <MatrixRain />

      {/* Vignette overlay */}
      <div className="fixed inset-0 pointer-events-none z-40 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />

      {/* Header */}
      <header className="relative z-30 border-b border-[#00ff41]/20 backdrop-blur-sm bg-[#050505]/80">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 border-2 border-[#00ff41] rounded flex items-center justify-center text-[#00ff41] font-mono text-lg md:text-xl font-bold animate-pulse shadow-[0_0_20px_#00ff41]">
              AI
            </div>
            <div>
              <h1 className="font-mono text-lg md:text-xl font-bold text-[#00ff41] tracking-wider">
                BASE_AGENTS
              </h1>
              <p className="text-[#00ff41]/50 text-[10px] font-mono hidden sm:block">
                // DIRECTORY v1.0.0
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isConnected && address && (
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#00ff41]/10 border border-[#00ff41]/30 rounded font-mono text-xs text-[#00ff41]">
                <span className="w-2 h-2 bg-[#00ff41] rounded-full animate-pulse" />
                <span>{address.slice(0, 6)}...{address.slice(-4)}</span>
              </div>
            )}
            <ConnectButton.Custom>
              {({ account, chain, openConnectModal, openAccountModal, mounted }) => {
                const connected = mounted && account && chain
                return (
                  <button
                    onClick={connected ? openAccountModal : openConnectModal}
                    className="px-4 py-2 bg-[#00ff41] text-black font-mono text-sm font-bold rounded hover:bg-[#00cc33] transition-colors shadow-[0_0_20px_rgba(0,255,65,0.3)] hover:shadow-[0_0_30px_rgba(0,255,65,0.5)]"
                  >
                    {connected ? '[ CONNECTED ]' : '[ CONNECT ]'}
                  </button>
                )
              }}
            </ConnectButton.Custom>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-20 max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Hero section */}
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-block px-4 py-1 mb-4 border border-[#00ff41]/30 rounded-full">
            <span className="text-[#00ff41] font-mono text-xs md:text-sm">
              ◉ LIVE ON BASE MAINNET
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-mono font-bold mb-4 md:mb-6">
            <span className="text-white">DISCOVER </span>
            <span className="text-[#00ff41] drop-shadow-[0_0_30px_#00ff41]">AI AGENTS</span>
          </h2>
          <p className="text-[#00ff41]/60 font-mono text-sm md:text-base max-w-2xl mx-auto leading-relaxed px-4">
            {'>'} Explore the autonomous AI agents building on Base.<br />
            {'>'} Trading, social, gaming, DeFi & more.
          </p>
        </div>

        {/* Search and filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#00ff41]/50 font-mono">{'>'}</span>
            <input
              type="text"
              placeholder="SEARCH_AGENTS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-[#00ff41]/30 rounded-lg px-8 py-3 font-mono text-sm text-[#00ff41] placeholder-[#00ff41]/30 focus:outline-none focus:border-[#00ff41] transition-colors"
            />
          </div>

          {/* Filter pills - horizontal scroll on mobile */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 md:px-4 py-2 rounded-lg font-mono text-xs whitespace-nowrap transition-all ${
                  filter === cat
                    ? 'bg-[#00ff41] text-black font-bold shadow-[0_0_15px_rgba(0,255,65,0.4)]'
                    : 'bg-[#0a0a0a] border border-[#00ff41]/30 text-[#00ff41]/70 hover:border-[#00ff41] hover:text-[#00ff41]'
                }`}
              >
                [{cat}]
              </button>
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <div className="flex flex-wrap gap-4 md:gap-8 mb-8 p-4 bg-[#0a0a0a] border border-[#00ff41]/20 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-[#00ff41]/40 font-mono text-xs">TOTAL_AGENTS:</span>
            <span className="text-[#00ff41] font-mono font-bold">{AGENTS.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#00ff41]/40 font-mono text-xs">ACTIVE:</span>
            <span className="text-[#00ff41] font-mono font-bold">{AGENTS.filter(a => a.status === 'active').length}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#00ff41]/40 font-mono text-xs">SHOWING:</span>
            <span className="text-[#00ff41] font-mono font-bold">{filteredAgents.length}</span>
          </div>
        </div>

        {/* Agents grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredAgents.map((agent, index) => (
            <AgentCard key={agent.id} agent={agent} index={index} />
          ))}
        </div>

        {filteredAgents.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#00ff41]/50 font-mono text-lg">
              {'>'} NO_AGENTS_FOUND
            </p>
            <p className="text-[#00ff41]/30 font-mono text-sm mt-2">
              Try adjusting your search or filter
            </p>
          </div>
        )}

        {/* Call to action */}
        {!isConnected && (
          <div className="mt-12 md:mt-16 p-6 md:p-8 bg-gradient-to-r from-[#00ff41]/10 to-transparent border border-[#00ff41]/30 rounded-lg text-center">
            <h3 className="font-mono text-xl md:text-2xl text-[#00ff41] font-bold mb-3">
              {'>'} CONNECT_TO_EXPLORE
            </h3>
            <p className="text-[#00ff41]/60 font-mono text-sm mb-6">
              Connect your wallet to interact with AI agents on Base
            </p>
            <ConnectButton />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-20 border-t border-[#00ff41]/10 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[#00ff41]/30 font-mono text-xs">
            Requested by @vladyy__01 · Built by @clonkbot
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(1000%); }
        }
        @keyframes matrix-fall {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        .animate-scan {
          animation: scan 8s linear infinite;
        }
        .animate-matrix-fall {
          animation: matrix-fall 15s linear infinite;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}

export default App
