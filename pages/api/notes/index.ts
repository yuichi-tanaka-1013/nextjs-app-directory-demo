import { zUpsertNote } from "@/app/notes/type";
import { prisma } from "@/globals/db";
import { getHandler, nextConnectRouter } from "@/utils/next-connect";
import InstrumentationMiddleware from "@/utils/telemetry/InstrumentationMiddleware";

export const config = {
  api: {
    externalResolver: true,
  },
};

const noteHandler = nextConnectRouter()
  .get(async (_, res) => {
    const notes = await prisma.note.findMany();
    return res.status(200).json(notes);
  })
  .post(async (req, res) => {
    const parcedData = zUpsertNote.parse(req.body);
    const note = await prisma.note.create({
      data: { title: parcedData.title, body: parcedData.body },
    });
    return res.status(200).json(note);
  });

export default InstrumentationMiddleware(getHandler(noteHandler));
