const fs = require('fs');
const path = require('path');
const { parse } = require('url');
const { createReadStream } = require('fs');

module.exports = async (req, res) => {
  const { query } = parse(req.url, true);
  const file = query.file;

  // Replace '/path/to/your/pdf/folder' with the actual path to your PDF folder
  const filePath = path.join('/src/assets/', file);

  try {
    // Check if the file exists
    const stat = fs.statSync(filePath);
    if (stat.isFile()) {
      // Set the appropriate headers for download
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=${file}`);
      
      // Stream the file to the response
      const stream = createReadStream(filePath);
      stream.pipe(res);
    } else {
      // File not found
      res.status(404).end('File not found');
    }
  } catch (error) {
    // Handle any errors
    res.status(500).end('Server Error');
  }
};
