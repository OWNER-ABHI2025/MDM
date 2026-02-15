import { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaQuestionCircle } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { RiSendPlaneFill } from "react-icons/ri";
import {
  MdDataExploration,
  MdBusinessCenter,
  MdBuildCircle,
  MdCompareArrows,
  MdStorage
} from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import { getAllFaqs, submitFaq } from "../apis/faq";

const originalFaqs = [
  {
    question: "What is a security notification?",
    answer: "A security notification is an alert that informs you about a potential or detected security threat related to your account, device, or network.These notifications could involve things like suspicious login attempts, unauthorized access, malware detection, or software vulnerabilities",
    // icon: < MdDataExploration className="text-[#1C6BA0] text-2xl" />,
    tags: ["mdm", "master data", "management"]
  },
  {
    question: 'How will I receive a security notification?',
    answer:
      'Security notifications can be delivered through System Notifcation',
    // icon: <MdBusinessCenter className='text-[#1C6BA0] text-2xl' />,
    tags: ["mdm", "master data", "management"]

  },
  {
    question: 'What should I do if I receive a security notification?',
    answer:
      'It depends on the type of notification:\n Suspicious login attempt: Immediately change your password and enable two - factor authentication(2FA). \n Malware alert: Run a full system scan with your antivirus software and follow any recommended actions. \n Account breach warning: Follow any instructions in the message to secure your account, such as resetting your password and reviewing recent activity.',
    // icon: <MdBuildCircle className='text-[#1C6BA0] text-2xl' />,
    tags: ["mdm", "master data", "management"]
  },
  {
    question: 'What is two-factor authentication (2FA)?',
    answer:
      '2FA adds an extra layer of security to your account by requiring two forms of identification: something you know (like your password) and something you have (like a smartphone app or a text message code). Enabling 2FA significantly reduces the chances of unauthorized access.',
    // icon: <MdCompareArrows className='text-[#1C6BA0] text-2xl' />,
  },
  {
    question: 'Can I ignore security notifications?',
    answer:
      'No. Ignoring security notifications can leave your account or device vulnerable to cyber threats. Always take action as advised in the notification to safeguard your data and privacy.',
    // icon: <MdStorage className='text-[#1C6BA0] text-2xl' />,
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFaqs, setFilteredFaqs] = useState([]);
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await getAllFaqs();
        setFaqs(response)
        setFilteredFaqs(response)
      } catch {
        toast.error("Error fetching Faqs")
      }
    }
    fetchFaqs()
  }, [])

  useEffect(() => {
    const search = searchQuery.toLowerCase();

    if (search.length === 0) {
      setFilteredFaqs(faqs)
      return
    }

    const filtered = faqs.filter(faq => (
      faq.question.toLowerCase().includes(search) || faq.answer.toLowerCase().includes(search)
    ))
    setFilteredFaqs(filtered);

  }, [searchQuery])

  const handleSubmitQuestion = async (e) => {
    e.preventDefault();

    if (!question.trim()) {
      toast.error('Please enter your question');
      return;
    }

    setIsLoading(true);

    try {
      await submitFaq(question)
      toast.success('Question submitted successfully!');
      setQuestion('');
    } catch (error) {
      toast.error('Failed to submit question. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const NoResults = () => (
    <div className="text-center py-8">
      <FaQuestionCircle className="mx-auto text-gray-400 text-4xl mb-4" />
      <p className="text-gray-500 dark:text-gray-400">
        No matching questions found. Would you like to ask a new question?
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1C6BA0] dark:text-white mb-4 flex items-center justify-center gap-3">
            <FaQuestionCircle className="text-[#1C6BA0] text-3xl sm:text-4xl" />
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Find answers to common questions about our Master Data Management system
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
          <div className="flex-1">
            <div className="mb-6 relative">
              <div className="relative">
                <BsSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search questions..."
                  className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#1C6BA0] focus:border-transparent outline-none transition-all duration-300"
                />
              </div>
            </div>

            <div className="space-y-3">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <button
                      onClick={() => setOpenIndex(openIndex === index ? null : index)}
                      className="w-full text-left p-4 sm:p-5 flex items-center justify-between focus:outline-none group"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        {faq.icon}
                        <h3 className="font-semibold text-gray-800 dark:text-white group-hover:text-[#1C6BA0] transition-colors duration-300 text-sm sm:text-base">
                          {faq.question}
                        </h3>
                      </div>
                      <IoIosArrowDown
                        className={`text-[#1C6BA0] transition-transform duration-300 flex-shrink-0 ml-2 ${openIndex === index ? "rotate-180" : ""
                          }`}
                        size={20}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-96" : "max-h-0"
                        }`}
                    >
                      <div className="p-4 sm:p-5 pt-0 text-gray-600 dark:text-gray-300 border-t dark:border-gray-700 text-sm sm:text-base">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <NoResults />
              )}
            </div>
          </div>

          <div className="lg:w-[400px] xl:w-[450px]">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 sticky top-6">
              <div className="text-center mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-[#1C6BA0] dark:text-white mb-2">
                  Still have questions?
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                  We're here to help! Ask your question below
                </p>
              </div>
              <form onSubmit={handleSubmitQuestion}>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Type your question here..."
                  rows="6"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#1C6BA0] focus:border-transparent outline-none transition-all duration-300 resize-none text-sm sm:text-base"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-[#1C6BA0] hover:bg-[#155785] text-white font-semibold py-2 sm:py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 text-sm sm:text-base ${isLoading ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                >
                  <span>{isLoading ? 'Submitting...' : 'Submit Question'}</span>
                  {!isLoading && <RiSendPlaneFill className="text-xl" />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
