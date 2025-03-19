import { headers as getHeaders } from 'next/headers'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import Link from 'next/link'

import config from '@/payload.config'
import { Media } from '@/payload-types'
import './styles.css'

export default async function HomePage() {
  const headers = getHeaders()
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers })

  // Fetch all blogs with authors populated
  const blogs = await payload.find({
    collection: 'blogs',
    limit: 100,
    depth: 2, // Ensure nested fields like authors are fully retrieved
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: 20 }}>
      <h2>Blogs by {user?.email || 'Unknown'}</h2>

      <div className="blogs">
        <Link href="/blog-create">
          <button
            style={{
              border: '1px solid #ccc',
              borderRadius: 10,
              padding: 10,
              marginBottom: 16,
              cursor: 'pointer',
            }}
          >
            Create Blog
          </button>
        </Link>

        {blogs.docs.length > 0 ? (
          blogs.docs.map((blog) => (
            <div
              key={blog.id}
              style={{
                border: '1px solid #ccc',
                borderRadius: 10,
                marginBottom: 16,
                overflow: 'hidden',
                padding: 16,
              }}
            >
              {/* Blog Title */}
              <h2>{blog.title}</h2>

              {/* Blog Image */}
              {blog.image ? (
                <Image
                  src={(blog.image as Media)?.url || '/placeholder.jpg'}
                  alt={blog.title}
                  width={150}
                  height={150}
                  style={{ borderRadius: 8 }}
                />
              ) : (
                <p>No Image</p>
              )}

              {/* Blog Description */}
              <p><strong>Description:</strong> {blog.description || 'No description available.'}</p>

              {/* Blog Date */}
              <p><strong>Published on:</strong> {blog.date ? new Date(blog.date).toDateString() : 'Unknown'}</p>

              {/* Blog Categories */}
              <p>
                <strong>Categories:</strong> {blog.categories?.length > 0 
                  ? blog.categories.map((cat) => cat.category).join(', ') 
                  : 'None'}
              </p>

              {/* Blog Authors (FIXED) */}
              <p>
                <strong>Authors:</strong> 
                {blog.authors?.length > 0
                  ? blog.authors.map((auth) => auth?.name || "Unknown").join(", ")
                  : "Unknown"}
              </p>

              {/* Blog Tags */}
              <p>
                <strong>Tags:</strong> {blog.tags?.length > 0 
                  ? blog.tags.map((tag) => tag.tag).join(', ') 
                  : 'None'}
              </p>

              {/* Draft Status */}
              <p>
                <strong>Status:</strong> {blog.draft 
                  ? <span style={{ color: 'red' }}>Draft</span> 
                  : <span style={{ color: 'green' }}>Published</span>}
              </p>

              {/* Blog Content (FIXED) */}
              <p><strong>Content:</strong></p>
              <div dangerouslySetInnerHTML={{
                __html: blog.content?.length > 0
                  ? blog.content.map((block) =>
                      block?.children
                        ? block.children.map((child) => child?.text || "").join(" ")
                        : ""
                    ).join("<br>")
                  : "No content available."
              }} />

              {/* Read More Link */}
              <Link href={`/blogs/${blog.id}`} style={{ textDecoration: 'none', color: 'blue' }}>
                Read More
              </Link>
            </div>
          ))
        ) : (
          <p>No blogs available.</p>
        )}
      </div>
    </div>
  )
}
