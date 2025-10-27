// Ticket Management Module (localStorage, client-only)
const TicketManager = (() => {
  const STORAGE_KEY = 'ticketapp_tickets';
  const ALLOWED_STATUSES = ['open', 'in_progress', 'closed'];
  const ALLOWED_PRIORITIES = ['low', 'medium', 'high', 'critical'];

  // Demo data
  const initialTickets = [
    {
      id: '1',
      title: 'Login page not responding',
      description: 'Users are experiencing timeout errors when trying to log in during peak hours.',
      status: 'in_progress',
      priority: 'high',
      assignee: 'John Doe',
      createdAt: '2025-10-20T00:00:00Z',
      updatedAt: '2025-10-23T00:00:00Z',
      createdBy: 'user@example.com',
    },
    {
      id: '2',
      title: 'Add dark mode support',
      description: 'Implement dark mode toggle for better user experience.',
      status: 'open',
      priority: 'medium',
      assignee: 'Jane Smith',
      createdAt: '2025-10-22T00:00:00Z',
      updatedAt: '2025-10-22T00:00:00Z',
      createdBy: 'admin@example.com',
    },
    {
      id: '3',
      title: 'Critical security vulnerability',
      description: 'SQL injection vulnerability found in the search feature. Needs immediate attention.',
      status: 'closed',
      priority: 'critical',
      assignee: 'Mike Johnson',
      createdAt: '2025-10-15T00:00:00Z',
      updatedAt: '2025-10-18T00:00:00Z',
      createdBy: 'security@example.com',
    },
    {
      id: '4',
      title: 'Update documentation',
      description: 'API documentation needs to be updated with new endpoints.',
      status: 'open',
      priority: 'low',
      assignee: 'Sarah Williams',
      createdAt: '2025-10-21T00:00:00Z',
      updatedAt: '2025-10-21T00:00:00Z',
      createdBy: 'user@example.com',
    },
    {
      id: '5',
      title: 'Dashboard loading slowly',
      description: 'Dashboard takes more than 5 seconds to load. Need to optimize queries.',
      status: 'closed',
      priority: 'medium',
      assignee: 'John Doe',
      createdAt: '2025-10-10T00:00:00Z',
      updatedAt: '2025-10-19T00:00:00Z',
      createdBy: 'admin@example.com',
    },
  ];

  // Load tickets from localStorage or use demo data
  function loadTickets() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        return [...initialTickets];
      }
    }
    return [...initialTickets];
  }

  function saveTickets(tickets) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
  }

  let tickets = loadTickets();

  function getTickets() {
    return [...tickets];
  }

  function getTicket(id) {
    return tickets.find(t => t.id === id);
  }

  function createTicket(data) {
    if (!data.title || !data.title.trim()) throw new Error('Title is required.');
    if (!data.status || !ALLOWED_STATUSES.includes(data.status)) throw new Error('Invalid status.');
    if (!data.priority || !ALLOWED_PRIORITIES.includes(data.priority)) throw new Error('Invalid priority.');
    if (!data.description || !data.description.trim()) throw new Error('Description is required.');
    if (data.description.length > 2000) throw new Error('Description must be 2000 characters or less.');
    const now = new Date().toISOString();
    const ticket = {
      ...data,
      id: Date.now().toString(),
      createdAt: now,
      updatedAt: now,
    };
    tickets = [ticket, ...tickets];
    saveTickets(tickets);
    return ticket;
  }

  function updateTicket(id, updates) {
    let updated = false;
    tickets = tickets.map(ticket => {
      if (ticket.id === id) {
        updated = true;
        const newTicket = { ...ticket, ...updates, updatedAt: new Date().toISOString() };
        if (!newTicket.title || !newTicket.title.trim()) throw new Error('Title is required.');
        if (!ALLOWED_STATUSES.includes(newTicket.status)) throw new Error('Invalid status.');
        if (!ALLOWED_PRIORITIES.includes(newTicket.priority)) throw new Error('Invalid priority.');
        if (!newTicket.description || !newTicket.description.trim()) throw new Error('Description is required.');
        if (newTicket.description.length > 2000) throw new Error('Description must be 2000 characters or less.');
        return newTicket;
      }
      return ticket;
    });
    if (!updated) throw new Error('Ticket not found.');
    saveTickets(tickets);
  }

  function deleteTicket(id) {
    const before = tickets.length;
    tickets = tickets.filter(t => t.id !== id);
    if (tickets.length === before) throw new Error('Ticket not found.');
    saveTickets(tickets);
  }

  return {
    init: () => { tickets = loadTickets(); },
    getAllTickets: getTickets,
    getTickets,
    getTicket,
    createTicket,
    updateTicket,
    deleteTicket,
  };
})();

// Initialize TicketManager on page load
TicketManager.init();
