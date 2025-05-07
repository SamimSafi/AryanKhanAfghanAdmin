const fetchClients = async () => {
    try {
      const response = await fetch('/clients.json');
      if (!response.ok) throw new Error('Failed to fetch clients');
      return await response.json();
    } catch (error) {
      throw new Error('Error loading clients: ' + error.message);
    }
  };
  
  const filterClients = (clients, searchTerm, hasLogo) => {
    let filtered = clients;
    if (searchTerm) {
      filtered = filtered.filter((client) =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (hasLogo) {
      filtered = filtered.filter((client) => client.logo && client.logo.trim() !== '');
    }
    return filtered;
  };
  
  const sortClients = (clients, sortOrder) => {
    return [...clients].sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (sortOrder === 'asc') return nameA.localeCompare(nameB);
      return nameB.localeCompare(nameA);
    });
  };
  
  const paginateClients = (clients, page, rowsPerPage) => {
    const start = (page - 1) * rowsPerPage;
    return clients.slice(start, start + rowsPerPage);
  };
  
  export default {
    fetchClients,
    filterClients,
    sortClients,
    paginateClients,
  };