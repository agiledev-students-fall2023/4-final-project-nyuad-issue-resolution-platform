import { backendpath } from "../../app.js";

export async function downloadFilesHandler(req, res) {
    const filename = req.params.filename;
    const fileDirectory = backendpath + '/uploads/';
    res.setHeader('Content-Disposition', 'attachment; filename=' + filename);
    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');

    res.download(fileDirectory + filename, function (err) {
      if (err) {
        console.log(err);
        res.status(err.status).end();
      }
    });
}
