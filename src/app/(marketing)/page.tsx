export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="max-w-lg bg-white p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4">StudySync</h1>
        <p className="text-lg text-gray-700 mb-6">
          Our website is currently under development.
        </p>
        <p className="text-md text-gray-600 mb-6">
          Soon you'll be able to access a range of intelligent study features such as:
        </p>
        <ul className="list-disc text-left text-gray-700 mb-6 pl-5">
          <li>Summaries of lecture notes</li>
          <li>Flashcards</li>
          <li>Quizzes</li>
          <li>Mindmaps</li>
        </ul>
        <p className="text-md text-gray-600 mb-8">
          An intelligent study platform to boost your learning experience.
        </p>
        <a
          href="https://github.com/saymanq/study-platform"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full transition"
        >
          View our GitHub Repository
        </a>
      </div>
    </div>
  );
}