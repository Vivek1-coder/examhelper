import dbConnect from "@/lib/dbConnect";
import multer from "multer";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { join } from "path";

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = join(process.cwd(), "public/uploads");
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Disable Next.js body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper function to wrap Multer middleware in a Promise
const uploadMiddleware = (req: NextApiRequest, res: NextApiResponse): Promise<void> =>
  new Promise((resolve, reject) => {
    upload.fields([{ name: "file", maxCount: 1 }, { name: "title", maxCount: 1 }])(
      req as any,
      res as any,
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });

export async function POST(req: Request) {
  await dbConnect();

  const reqWithFormData = req as unknown as NextApiRequest;
  const resWithFormData = new NextApiResponse();

  try {
    await uploadMiddleware(reqWithFormData, resWithFormData);

    // Access the uploaded file
    const file = (reqWithFormData as any).files?.file?.[0];

    // Access additional fields
    const title = (reqWithFormData as any).body?.title;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (!title) {
      return NextResponse.json({ error: "Title is missing" }, { status: 400 });
    }

    return NextResponse.json({
      message: "File uploaded successfully",
      file: {
        name: file.originalname,
        path: `/uploads/${file.filename}`,
      },
      title,
    });
  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}
