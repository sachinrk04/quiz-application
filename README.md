# Quiz Application

A comprehensive, feature-rich quiz application built with React and TypeScript. Create, take, and review quizzes with support for multiple question types, timers, dark mode, and persistent storage.

## 🚀 Features

### Core Functionality
- **Quiz Creation**: Build custom quizzes with titles, descriptions, and multiple question types
- **Multiple Question Types**: Support for single-choice and multiple-choice questions
- **Timer Functionality**: Set time limits for entire quizzes or individual questions
- **Quiz Taking**: Intuitive interface for answering questions with navigation controls
- **Results & Review**: Comprehensive scoring system with answer explanations
- **Quiz History**: Track and review past quiz attempts with detailed analytics

### User Experience
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Accessibility**: ARIA attributes, keyboard navigation, and screen reader support
- **Smooth Animations**: Enhanced user interactions with CSS transitions
- **Progress Tracking**: Visual progress indicators and time remaining displays

### Data Management
- **Local Storage**: Persistent quiz data and results
- **Quiz Shuffling**: Randomize question order for varied experiences
- **Skip Functionality**: Skip questions and return to them later
- **Answer Validation**: Real-time answer checking and feedback

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS with custom dark mode support
- **Icons**: Lucide React
- **State Management**: React Context API with useReducer
- **Storage**: LocalStorage for data persistence
- **Build Tool**: Create React App

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd quiz-application
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🎯 Usage

### Creating a Quiz
1. Click "Create Quiz" on the home page
2. Fill in quiz title and description
3. Add questions with multiple options
4. Set question type (single-choice or multiple-choice)
5. Configure time limits and shuffling options
6. Save your quiz

### Taking a Quiz
1. Click "Take Quiz" on the home page
2. Select a quiz from the available options
3. Answer questions using radio buttons or checkboxes
4. Navigate between questions using Previous/Next buttons
5. Skip questions if needed
6. Submit when finished

### Reviewing Results
1. View your score and time spent
2. Review individual answers
3. See explanations for correct answers
4. Check your quiz history for past attempts

## 🏗️ Project Structure

```
src/
├── Components/           # React components
│   ├── HomePage.tsx     # Main dashboard
│   ├── QuizBuilder.tsx  # Quiz creation interface
│   ├── QuizPlayer.tsx   # Quiz taking interface
│   ├── QuizHistory.tsx  # Results and analytics
│   ├── QuestionCard.tsx # Individual question display
│   ├── QuestionOption.tsx # Optimized option component
│   ├── ProgressBar.tsx  # Progress indicator
│   ├── QuizResults.tsx  # Results display
│   ├── ThemeToggle.tsx  # Dark/light mode toggle
│   └── Timer.tsx        # Timer component
├── context/             # State management
│   └── QuizContext.tsx  # Global app state
├── data/               # Static data
│   └── questionsList.ts # Sample questions
├── types/             # TypeScript definitions
│   └── quizType.ts    # Type interfaces
├── utils/             # Utility functions
│   └── animations.ts  # Animation configurations
└── App.tsx            # Main application component
```

## 🎨 Customization

### Adding New Question Types
1. Update the `QuestionType` in `types/quizType.ts`
2. Modify the `QuestionCard` component to handle the new type
3. Update the `QuizBuilder` to support the new question type
4. Adjust answer validation logic in `QuizPlayer`

### Styling Customization
- Modify `tailwind.config.js` for theme customization
- Update `src/index.css` for global styles
- Customize component-specific styles in individual components

### Adding New Features
- Extend the `AppState` interface in `QuizContext.tsx`
- Add new action types to the reducer
- Create new components following the existing patterns
- Update the main `App.tsx` to include new views

## 🔧 Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Performance Optimizations

- **Memoized Components**: Prevent unnecessary re-renders
- **Lazy Loading**: Components loaded on demand
- **Optimized State Updates**: Efficient state management
- **CSS Transitions**: Smooth animations without JavaScript
- **Local Storage**: Fast data persistence

## 🔒 Security Considerations

- Input validation and sanitization
- XSS prevention through proper escaping
- Secure data storage practices
- Client-side validation with server-side verification (when implemented)

## 📈 Future Enhancements

- **API Integration**: Backend server for data persistence
- **User Authentication**: User accounts and profiles
- **Advanced Analytics**: Detailed performance metrics
- **Social Features**: Quiz sharing and leaderboards
- **AI Integration**: Smart question generation
- **Real-time Features**: Multiplayer quiz sessions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For questions or support, please open an issue in the repository.

---

**Note**: This application currently uses LocalStorage for data persistence. For production use with multiple users, consider implementing a backend API as outlined in the System Design document.
