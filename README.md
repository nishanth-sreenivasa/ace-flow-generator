# ACE Flow Generator

A web application that converts natural language descriptions into Digital (ACE) YAML flow configurations using AI.


## 🛠️ Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom theming
- **AI Integration**: OpenAI GPT-4 API
- **Components**: React with TypeScript interfaces
- **Build Tool**: Next.js with optimized production builds

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18+ installed
- OpenAI API key

### Installation

1. **Clone the repository**:
```bash
git clone <repository-url>
cd ace-flow-generator
```

2. **Install dependencies**:
```bash
npm install
```

3. **Configure environment**:
Create `.env.local` file:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

4. **Start development server**:
```bash
npm run dev
```

5. **Open application**:
Navigate to http://localhost:3000

## 🏗️ Architecture & Design Decisions

### Project Structure
```
ace-flow-generator/
├── app/
│   ├── api/generate/route.ts    # OpenAI API integration
│   ├── globals.css              # Global styling and themes
│   ├── layout.tsx               # App layout wrapper
│   └── page.tsx                 # Main application page
├── components/
│   ├── Button.tsx               # Reusable button component
│   ├── ChatInput.tsx            # Input form component
│   └── YamlOutput.tsx           # YAML display component
├── data/
│   └── knowledge.json           # ACE knowledge base
└── README.md
```

### Key Design Decisions

1. **Next.js App Router**: Chosen for modern React development with built-in API routes
2. **TypeScript**: Provides type safety and better developer experience
3. **Component-based Architecture**: Modular, reusable React components
4. **Knowledge Base Integration**: Built-in ACE patterns and examples for better AI output
5. **Professional UI**: Clean, minimal design focused on usability
6. **Client-side Generation**: Real-time YAML generation without page refreshes

### API Design
- **POST /api/generate**: Accepts natural language input, returns structured YAML
- **Error Handling**: Graceful error responses with user-friendly messages
- **Knowledge Enhancement**: AI prompts enriched with ACE-specific context

## 💡 How to Use

1. **Describe your flow** in natural language in the text area
2. **Click "Generate YAML"** to process your description
3. **Review the generated YAML** with syntax highlighting
4. **Copy or download** the result for use in ACE

### Example Input
```
Create a two-step flow to verify JWT and call API
```

### Generated Output
Complete ACE YAML configuration  file with proper structure and  steps.

## ⚠️ Known Limitations

1. **API Dependency**: Requires OpenAI API key and internet connection
2. **ACE Version Compatibility**: Generated YAML may need minor adjustments for specific ACE versions
3. **Complex Flows**: Very complex business logic may require manual refinement
4. **Rate Limiting**: Subject to OpenAI API rate limits
5. **Knowledge Base**: Limited to current ACE patterns in knowledge base

## 🔮 Future Improvements

### Short Term
- **Template Library**: Pre-built templates for common flow patterns
- **YAML Validation**: Real-time syntax validation before download
- **Error Handling**: Error handling for 4xx and 5xx errors
- **Flow Visualization**: Graphical representation of generated flows


### Long Term
- **Multi-language Support**: Support for different natural languages
- **Integration Testing**: Built-in testing capabilities for generated flows
- **Version Control**: Git integration for flow versioning
- **Collaborative Features**: Team sharing and collaboration tools
- **Advanced AI Models**: Integration with newer AI models as they become available

## 🧪 Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📋 Demo Checklist

- ✅ Working web application
- ✅ Natural language to YAML conversion
- ✅ Professional UI with ACE branding
- ✅ Copy/download functionality
- ✅ Loading states
- ✅ Responsive design
- ✅ TypeScript implementation
- ✅ Component-based architecture

## 🎯 Value Proposition

This tool significantly reduces the time and expertise required to create ACE flow configurations, making integration development more accessible to business users and speeding up development cycles for technical teams.